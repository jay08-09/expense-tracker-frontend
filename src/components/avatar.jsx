import React from "react";
import getRandomColor from './getRandomColor'


const Avatar = (props) => {
    const initials = getInitials(props?.firstName, props?.lastName);
    const backgroundColor = getRandomColor
    const textColor = getRandomColor
    
    const avatarStyle = {
        width: `${props?.height}px`,
        height: `${props?.width}px`,
        borderRadius: '50%',
        backgroundColor: backgroundColor,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: `${props?.width / 3}px`,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    };

    return (
        <div style={avatarStyle}>
            {initials}
        </div>
    )
}

const getInitials = (firstname, lastname) => {
    if (!firstname || !lastname) return '';
    return `${firstname?.charAt(0)?.toUpperCase()}${lastname?.charAt(0)?.toUpperCase()}`
}

export default Avatar;