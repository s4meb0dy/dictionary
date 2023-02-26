import React from 'react'

type StatusProps = {
    type: 'success' | 'warning'
}

const Status: React.FC<StatusProps> = ({ type }) => {
    const [color, setColor] = React.useState<string>('#fff')

    React.useEffect(() => {
        switch (type) {
            case 'success':
                setColor('#1D9745')
                break
            case 'warning':
                setColor('#C89600')
                break
        }
    }, [type])

    return (
        <div
            className="w-[7px] h-[7px] rounded-full"
            style={{ backgroundColor: color }}
        />
    )
}

export default Status
