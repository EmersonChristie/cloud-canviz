import React, { Component } from 'react'
import classes from './SideDrawer.module.css'
import ColorPicker from '../../ColorPicker/ColorPicker'
import Item from './Item/Item'
import OptionsList from '../../OptionsList/OptionsList'
import PriceSlider from '../../PriceSlider/PriceSlider'
import Painting from "../../../assets/images/painting.png"
import Photography from "../../../assets/images/photography.png"
import Drawing from "../../../assets/images/drawing.png"
import MixedMedia from "../../../assets/images/mixedmedia.png"
import Option from "../../../assets/images/option.png"
import Print from "../../../assets/images/print.png"

class SideDrawer extends Component {
    state = {
        category: [],
        style: [],
        orientation: [],
        offset: 0,
        limit: 9
    }
 
    categoryChangeHandler = (category) => {
        let newState = this.state
        if(this.state.category.includes(category)){
            newState.category = newState.category.filter(i => i !== category)
            this.setState(newState)
        }
        else{
            this.setState({category: this.state.category.concat(category)})
            newState.category.push(category)
        }
        this.props.filterHandler(newState)
    }
    styleChangeHandler = (style) => {
        let newState = this.state
        if(this.state.style.includes(style)){
            newState.style = newState.style.filter(i => i !== style)
            this.setState(newState)
        }
        else{
            this.setState({style: this.state.style.concat(style)})
            newState.style.push(style)
        }
        this.props.filterHandler(newState)
    }
    orientationChangeHandler = (orientation) => {
        let newState = this.state
        if(this.state.orientation.includes(orientation)){
            newState.orientation = newState.orientation.filter(i => i !== orientation)
            this.setState(newState)
        }
        else{
            this.setState({orientation: this.state.orientation.concat(orientation)})
            newState.orientation.push(orientation)
        }
        this.props.filterHandler(newState)
    }
    render(){
        return (
            <div className={classes.SideDrawer}>
                {console.log(this.state)}
                <div className={classes.productType}>
                    <span className={classes.heading}>CATEGORY</span>
                    <Item item="Painting" url={Painting} selectedHandler={(category) => this.categoryChangeHandler(category)}/>
                    <Item item="Photography" url={Photography} selectedHandler={(category) => this.categoryChangeHandler(category)}/>
                    <Item item="Drawing" url={Drawing} selectedHandler={(category) => this.categoryChangeHandler(category)}/>
                    <Item item="Sculpture" url={Painting} selectedHandler={(category) => this.categoryChangeHandler(category)}/>
                    <Item item="Mixed Media" url={Painting} selectedHandler={(category) => this.categoryChangeHandler(category)}/>
                    <Item item="Print" url={Print} selectedHandler={(category) => this.categoryChangeHandler(category)}/>
                </div>
                <div className={classes.color}>
                    <span className={classes.heading}>COLOR</span>
                    <ColorPicker />
                </div>
                <div className={classes.size}>
                    <span className={classes.heading}>STYLE</span>
                    <Item item="Abstract" url={Option} selectedHandler={(style) => this.styleChangeHandler(style)}/>
                    <Item item="Fine Art" url={Option} selectedHandler={(style) => this.styleChangeHandler(style)}/>
                    <Item item="Modern" url={Option} selectedHandler={(style) => this.styleChangeHandler(style)}/>
                    <Item item="Photo Realism" url={Option} selectedHandler={(style) => this.styleChangeHandler(style)}/>
                    <Item item="Expressionism" url={Option} selectedHandler={(style) => this.styleChangeHandler(style)}/>
                    <Item item="Realism" url={Option} selectedHandler={(style) => this.styleChangeHandler(style)}/>
                </div>
                <div className={classes.price}>
                    <span className={classes.heading}>PRICE</span>
                    <PriceSlider />
                </div>
                <div className={classes.orientation}>
                    <span className={classes.heading}>ORIENTATION</span>
                    <Item item="Portrait" url={Option} selectedHandler={(orientation) => this.orientationChangeHandler(orientation)}/>
                    <Item item="Landscape" url={Option} selectedHandler={(orientation) => this.orientationChangeHandler(orientation)}/>
                    <Item item="Square" url={Option} selectedHandler={(orientation) => this.orientationChangeHandler(orientation)}/>
                </div>
                {/** <div className={classes.artistCountry}>
                    <span className={classes.heading}>ARTIST COUNTRY</span>
                    <Item item="United States" url={Option} selectedHandler={(orientation) => this.orientationChangeHandler(orientation)}/>
                    <Item item="United Kingdom" url={Option} selectedHandler={(orientation) => this.orientationChangeHandler(orientation)}/>
                    <Item item="Canada" url={Option} selectedHandler={(orientation) => this.orientationChangeHandler(orientation)}/>
                </div> */}
            </div>
        )
        

    }
}

export default SideDrawer