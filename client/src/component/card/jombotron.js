import React from 'react'
import Typewriter from 'typewriter-effect'

const Jumbotron = () => {
    return (
        <Typewriter
            options={{
                strings: ['Edel crafts'],
                autoStart: true,
                loop: true,
            }}
        />
    )
}

export default Jumbotron;