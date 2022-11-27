import React, { useState } from 'react';

import '../css/modal.css';
function Modal(props) {
    const { modal, reSizeMode, video, mic } = props.actionVisible;
    return (
        <div className="modal">
            <div className="modalStream">
                <div className="boxCall">
                    <button type="button" className="reSizeMode"><box-icon name='area' size="md" color="#ffffff"></box-icon></button>
                    <video src="" controls className="videoRemote"></video>
                    <div className="localStream">
                        {video &&
                            <video src="" controls className="videoLocal"></video>
                        }
                    </div>
                </div>
                <div className="boxCallAction">
                    <div className="actionItem">
                        {video ?
                            <button type="button" onClick={() => props.handlerVideo(false)}><box-icon name='video' type='solid' color="#1eb2a6"></box-icon></button>
                            :
                            <button type="button" onClick={() => props.handlerVideo(true)}><box-icon name='video-off' color="#1eb2a6"></box-icon></button>
                        }
                        {mic ?
                            <button type="button" onClick={() => props.handlerMic(false)}><box-icon name='microphone' type='solid' color="#FFA34D" ></box-icon></button>
                            :
                            <button type="button" onClick={() => props.handlerMic(true)}><box-icon name='microphone-off' type='solid' color="#1eb2a6"></box-icon></button>
                        }
                        <button type="button" onClick={() => props.handlerCallVoice({ modal: false, video: false })}><box-icon name='phone-off' type='solid' color="#F67575"></box-icon></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal