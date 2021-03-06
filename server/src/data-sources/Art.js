const { DataSource } = require("apollo-datasource");
const User = require("../models/user");
const ArtWork = require("../models/artWork");
const { getColors } = require("../googleVision/googleVision");
const { AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");

class Art extends DataSource {
  constructor() {
    super();
  }
  // initialize context
  initialize(config) {
    this.context = config.context;
  }
  //getAllArt
  //returns all the art in a users library
  getAllArt(args) {
    //deleting offset and limit from args because we don't need them in find query
    const offset = args.getAllArtInput.offset
    const limit = args.getAllArtInput.limit
    delete args.getAllArtInput.offset
    delete args.getAllArtInput.limit

    //if filter is empty then delete it
    if(args.getAllArtInput.category.length === 0)
      delete args.getAllArtInput.category
    if(args.getAllArtInput.styles.length === 0)
      delete args.getAllArtInput.styles
    if(args.getAllArtInput.orientation.length === 0)
      delete args.getAllArtInput.orientation
    
    //if there's no filer
    if(!Object.keys(args.getAllArtInput).length){
      console.log(args)
      return ArtWork.find()
      .skip(offset)
      .limit(limit)
      .sort("-createdAt")
      .populate("creator")
      .then(artworks => {
        console.log(artworks.length)
        return artworks.map(artwork => {
          return { ...artwork._doc };
        });
      })
      .catch(err => {
        throw err;
      });

    }
    //if there's filter
    //args.getAllArtInput contains filters e.g {oreination: [portrait, square], style: ["Abstract"]}
    else{
      console.log(args.getAllArtInput)
      return ArtWork.find(args.getAllArtInput)
      .skip(offset)
      .limit(limit)
      .sort("-createdAt")
      .populate("creator")
      .then(artworks => {
        console.log(artworks.length)
        return artworks.map(artwork => {
          return { ...artwork._doc };
        });
      })
      .catch(err => {
        throw err;
      });
    }
    
  }

  // attempting to implement similar to createArt()
  async createContact(args) {
    const usr = this.context.user._id;
    console.log("usr id", usr);
    const contact = {
      ...args.contactInput,
      lead_owner: this.context.user._id
    };

    return Contact.findOneAndUpdate(
      { email: args.contactInput.email }, // find a document with that filter
      { $set: contact }, // document to insert when nothing was found
      { upsert: true, new: true, runValidators: true, omitUndefined: true },
      (err, doc) => {
        if (err) {
          console.log("findoneandupdate err: ", err);
        }

        console.log("doc", doc);
        const createdContact = doc;
        return User.findById(createdContact.lead_owner)

          .then(user => {
            user.contactList.push(doc._id);
            return user.save();
          })
          .then(res => {
            return createdContact;
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      }
    );
  }

  // // createArt
  // // saves art data
  // // adds userId of creator to creator field
  async createArt(args) {
    const user = this.context.user._id;
    let newArt = { ...args.artInput };
    const isNewArt = args._id ? false : true;
    // if _id arg is null then it is a new art so create new
    if (isNewArt) {
      console.log("is new art", args._id);
      // get colors from google cloud vision
      return await getColors(args.artInput.img.url)
        .then(colors => {
          console.log("colors in await", colors);

          // set values for primary, secondary and tertiary colors with response form GCV
          const art = new ArtWork({
            ...args.artInput,
            creator: user,
            primaryColor: colors[0],
            secondaryColor: colors[1],
            tertiaryColor: colors[2],
            colors: colors
          });
          let createdArt;
          return art
            .save()
            .then(result => {
              // Farris I added these console logs so that you could see how to access the current user from the context
              // to get the id you would just need to do this.context.user._id and use that id to find the user by id
              // with User.findById( ) and pass the id in, then you can push the id of result._id onto the users creaetedArt array
              console.log("data returned from createArt", result);

              console.log("user from context", user);

              {
                /* save result to return it later */
              }
              createdArt = { ...result._doc };
              {
                /* creator id is accessed from Art
          Finds the user and pushes the new artwork in createdArtWork array*/
              }
              return User.findById(createdArt.creator._id);
            })
            .then(user => {
              console.log(user);
              user.createdArtWorks.push(art._id);
              return user.save();
            })
            .then(res => {
              return createdArt;
            })
            .catch(err => {
              console.log(err);
              throw err;
            });
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
    }
    // _id was not null so update existing art matching id
    else {
      const oldDoc = await ArtWork.findById(args._id).exec();
      let hasNewImage;
      if (oldDoc.img.url == newArt.img.url) hasNewImage = false;
      else hasNewImage = true;
      // if the url is different than previous one make new call to cloud vision for colors
      if (hasNewImage) {
        const colors = await getColors(args.artInput.img.url).catch(err => {
          console.log(err);
          throw err;
        });

        newArt = {
          ...newArt,
          primaryColor: colors[0],
          secondaryColor: colors[1],
          tertiaryColor: colors[2],
          colors: colors
        };
        console.log("newArt", newArt);
      }

      return ArtWork.findByIdAndUpdate(
        args._id,
        { $set: newArt }, // document to insert when nothing was found
        { upsert: true, new: true, runValidators: true, omitUndefined: true },
        (err, doc) => {
          if (err) {
            console.log("findandupdate create art err: ", err);
            throw err;
          }
          console.log("Updated doc: ", doc);
        }
      );
    }
  }

  // likeArt() -> uses the artID argument to find an artwork object
  //            then pushes the id of the current user onto the likers array of art object
  //            then pushes the ID of the art object onto the users likedArtworks array
  //            then saves and returns the liked artwork
  // inputs: artId (the ID of the artwork the current user wants to save/like)
  // output: the art object the user liked

  // changed like art so that the same user can't like an art multiple times
  // if the users id is already the array it will not push
  likeArt(args) {
    const usrID = this.context.user._id;
    return User.findByIdAndUpdate(usrID, {
      $addToSet: { likedArtWorks: args.artId } // $addToSet only pushes to array if entry is unique (isn't already in the array)
    })
      .then(user => {
        return ArtWork.findByIdAndUpdate(args.artId, {
          $addToSet: { likers: user._id }
        });
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
  async unlikeArt(args) {
    const userId = this.context.user._id;
    return User.findById(userId)
      .exec()
      .then(user => {
        console.log("current user: ", user)
        user.likedArtWorks = user.likedArtWorks.filter(function(value) {
          return value != args.artId;
        });
        return user.save();
      })
      .then(user => {
        return ArtWork.findById(args.artId)
          .exec()
          .then(art => {
            art.likers = art.likers.filter(i => !i.equals(userId))
            console.log(art.likers)
            return art.save()
          })
          .then(art => {
            return art
            
          })
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
  // removeArt -> removes the art document matching the artID passed as argument
  // input: artId
  // returns: the art document deleted
  // notes: The art object may have several references in other places of db such as
  //        likedArtWorks and createdArtWorks arrays in the user collection
  //        instead of deleting here there is middleware run just before .remove() is called
  //        on any artwork document that removes the references specified. (see function at bottom of server/models/artWork.js)
  removeArt(artId) {
    // when calling a remove() function that applies middleware you must fist use Find()
    // to retrieve the document then call remove()
    return ArtWork.findById(artId).then(art => {
      // make sure the person calling removwArt() is the user who created (id is in art's creator field)
      if (art.creator.toString() === this.context.user._id.toString())
        return art.remove().catch(err => console.log(err));
      else
        throw new AuthenticationError(
          "Cannot delete art that doesn't you are not creator of"
        );
    });
  }
}

module.exports = Art;
