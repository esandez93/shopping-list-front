import React, { Component } from 'react';
import logo from './logo.svg';
import back from './back.png';
import GreyProfile from './grey_profile.png';

import { Link } from 'react-router-dom';

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

class Profile extends Component {
  state = {
    image: null,
    supportsCamera: 'mediaDevices' in navigator
  }

  changeImage = (event) => {
    this.setState({
      image: URL.createObjectURL(event.target.files[0])
    })
  }

  startChangeImage = () => {
    this.setState({ enableCamera: !this.state.enableCamera })
  }

  takeImage = () => {
    let canvas = this._canvas
    let video = this._video

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    canvas.getContext('2d').drawImage(
      video,
      0, 0,
      video.videoWidth,
      video.videoHeight
    )

    video.srcObject.getVideoTracks().forEach(track => {
      track.stop()
    })

    this.setState({
      image: canvas.toDataURL(),
      enableCamera: false
    })
  }

  subscribe = () => {
    const key = 'BMzDQIf9-I-PxeXarK10myimJqddDyrxPulcYmmeAmz8hJcBJdMeAlU3YaDvf4EitRDH3a3F9cHbvwrZm2yBcl4'

    global.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(key)
    }).then(sub => {
      console.log('Subscribed to push')
    }).catch(error => {
      console.log('Error while subscribing')
      console.log(error)
    })
  }

  testPush = () => {
    global.registration.showNotification('Test Push', {
      body: 'Test successful!'
    })
  }
 
  render() {
    return (
      <div>
        <nav className="navbar navbar-ligh bg-light">
          <span className="navbar-brand mb-0 h1">
            <Link to="/">
              <img src={back} alt="logo" style={{ height: 30 }} />
            </Link>
            Profile
          </span>
        </nav>

        <div style={{ textAlign: 'center' }}>
          <img
            src={this.state.image ||  GreyProfile}
            alt="profile"
            style={{ height: 200, marginTop: 50 }}
          />
          <p style={{ olor: '#888888', fontSize: 20 }}>Username</p>

          {
            this.state.enableCamera &&
            <div>
              <video
                ref={c => {
                  this._video = c

                  if (this._video) {
                    navigator.mediaDevices.getUserMedia({ video: true })
                    .then(stream => this._video.srcObject = stream)
                  }
                }}
                controls={false} autoPlay
                style={{ width: '100%', maxWidth: 300 }}
              ></video>

              <br />

              <button
                onClick={this.takeImage}
              >Take Image</button>

              <canvas
                ref={c => this._canvas = c}
                style={{ display: 'none' }}
              ></canvas>
            </div>
          }

          <br />
          {
            this.state.supportsCamera &&
            <button onClick={this.startChangeImage}>
              Toggle Camera
            </button>
          }

          <br />
          <button onClick={this.subscribe}>Subscribe for notifications</button>

          <br />
          <button onClick={this.testPush}>Test push notification</button>
        </div>
      </div>
    )
  }
}

export default Profile