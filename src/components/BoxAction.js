import React from 'react';
import '../css/boxAction.css';
function boxAction(props) {
    const handleActive = props.handleChange;
    const { id, title, nameLogo, active } = props.action;
    const ItemAction = () => {
        if (active) {
            return (
                <div className="boxAction_item" onClick={() => handleActive(id)} style={{ backgroundColor: '#F5EEEE' }}>
                    <span>
                        <box-icon type="solid" name={nameLogo} color="#1eb2a6"></box-icon>
                    </span>
                    <p className="Action_item-title">{title}</p>
                </div>
            )
        } else {
            return (
                <div className="boxAction_item" onClick={() => handleActive(id)} >
                    <span>
                        <box-icon type="solid" name={nameLogo} color="gray"></box-icon>
                    </span>
                    <p className="Action_item-title">{title}</p>
                </div>
            )
        }
    }
    return (
        <ItemAction></ItemAction>
    )
}

export default boxAction