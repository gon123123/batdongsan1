import React, { useState } from 'react';

import '../css/modal.css';
function Modal({ modal, reSizeMode, video, mic, handlerVideo, handlerMic, handlerCallVoice }) {
    return (
        <div className="modal">
            <div className="modalStream">
                <div className="boxCall">
                    <button type="button" className="reSizeMode"><box-icon name='area' size="md" color="#ffffff"></box-icon></button>
                    <video src="" controls className="videoRemote" id="videoRemote" autoPlay></video>
                    <div className="localStream">
                        {video &&
                            <video src="" controls className="videoLocal" id="videoLocal" autoPlay ></video>
                        }
                    </div>
                </div>
                <div className="boxCallAction">
                    <div className="actionItem">
                        <button type="button" onClick={() => handlerCallVoice({ modal: false, video: false })}><box-icon name='phone-off' type='solid' color="#F67575"></box-icon></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal