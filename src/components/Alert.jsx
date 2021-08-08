import React, { useEffect }  from 'react';
import { useMediaQuery } from './useMediaQuery';

function Alert(props) {
     useEffect(() => {

     })
    // const isBig = useMediaQuery('(min-width: 700px');
    const isBig = true;

    const styles = {
        overlay: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        },
        body: {
            width: '100%',
            maxWidth: '600px',
            minHeight: '35px',
            backgroundColor: 'rgb(200,200,200)',
            margin: '10px 0px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            borderRadius: '5px'
        },
        message: {
            fontWeight: 500,
            width: 'calc(100% - 48px)',
            wordWrap: 'break-word',
            padding: '4px 0px',
            position: 'relative',
            left: 4,
            textAlign: 'justify'
        },
        buttonContainer: {
            position: 'absolute',
            right: '25px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '28px',
            width: '28px'
        },
        buttonText: {
            position: 'relative',
            top: '-2px',
            fontWeight: 600,
            fontSize: 24
        }
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.body}>
                <div style={styles.message}>
                    {props.text}                    
                </div>
                <div style={styles.buttonContainer}>
                    <button onClick={props.close} style={styles.button}>
                        <p style={styles.buttonText}>&times;</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Alert

