import { useEffect, useState } from "react"

const CountDown = (props) => {
    const [count, setCount] = useState(300)
    useEffect(() => {
        if (count === 0) {
            props.onTimeUp()
            return;
        }
        const timer = setInterval(() => {
            setCount(count - 1)
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, [count])
    return (
        <div className="count-down-container">
            {new Date(count * 1000).toISOString().substring(14, 19)}
        </div>
    )
}
export default CountDown