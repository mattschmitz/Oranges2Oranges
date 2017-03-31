'use strict';
import React from 'react';
import { Col, Panel } from 'react-bootstrap';

class MemeCanvas extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      bottomText: '',
      img: undefined,
      canvas: undefined,
      ctx: undefined,
      x: undefined,
      y: undefined,
      scale: 1,
    }
    this.writeText = this.writeText.bind(this);
  };

  componentDidMount() {
    let self = this;
    const img = this.refs.image;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.font = '20pt sans-serif';
    img.onload = function(){
      let x = canvas.width/2 - img.width/2;
      let y = canvas.height/2 - img.height/2;
      // img.classList.add('test');
      // console.log('img.classList', img.classList);
      ctx.drawImage(img, x, y);
      // ctx.drawImage(img, x, y, img.width, img.height,
      //                    x, y, img.width, canvas.height);
      self.setState({img: img, canvas: canvas, ctx: ctx, x: x, y: y}, () => {
        // self.scaleImage(.2)
      });
    }
  }

  writeText(event) {
    let text = event.target.value.toUpperCase();
    this.setState({bottomText: text}, () => {
      this.transformCanvas();
    });
    // ctx.textBaseline = 'top';
    // ctx.fillText(text, 20,20)
  }

  transformCanvas() {
    console.log('called trasform canvas')
    let {canvas, ctx, img, x, y, scale, bottomText} = this.state;
    ctx.save();
    ctx.clearRect(0,0, canvas.width, canvas.height);

    //scale
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width/2, -canvas.height/2);

    //redraw image
    ctx.drawImage(img,x,y)
    
    //add text: 
    ctx.lineWidth  = 5;
    ctx.font = '20pt sans-serif';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.lineJoin = 'round';
    ctx.strokeText(bottomText, canvas.width/2, canvas.height/2)
    ctx.fillText(bottomText, canvas.width/2, canvas.height/2)


    ctx.restore();
  }



  render() {
    return (
      <div className="meme-canvas">
        <canvas ref="canvas" width={300} height={400}>
        sorry, canvas not supported
        </canvas>
        <img className="meme-image" ref="image" src={this.props.prompt}  alt={this.props.prompt}/>
        <div className="input-group">
          <input type='text' id='bottom-text' value={this.state.bottomText} onChange={this.writeText} />
        </div>
      </div>
    );
  }
}

export default MemeCanvas;



