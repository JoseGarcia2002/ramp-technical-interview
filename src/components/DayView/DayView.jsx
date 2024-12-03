import { useState } from "react"
import './DayView.css'

const time = new Date()
const hours = Array.from({length: 24}, (_, i) => `${i % 12 == 0 ? 12 : i % 12}:00 ${i > 11 ? "PM" : "AM"}`)

const example_events = [
    {id: 1, event_name: "Meeting", start_time: 13, end_time: 14},
    {id: 2, event_name: "Planning", start_time: 15, end_time: 16},
]

const Event = ({event_name, start_time, end_time}) => {
    return (
        <div
            className="event"
            style={{
                top: `${4*start_time}rem`,
                height: `${4*(end_time - start_time)}rem`,
            }}
        >
            {event_name}
        </div>
    )
}

export const DayView = () => {
    const [events, setEvents] = useState(example_events)
    const [counter, setCounter] = useState(3)

    const [newStartTime, newEndTime] = useState(0)


    const handleAddEvent = (e) => {
        e.preventDefault()
        setEvents(...events, {id: counter, })
    }

    return (
        <div className="dayview-container">
            <div className="header-items">
                <div className="todays-date">
                    {`${time.getMonth()}-${time.getDate()}-${time.getFullYear()}`}
                </div>
                <div className="event-creation-menu">
                    <form>
                        <label for="event-name">Event name</label>
                        <input id="event-name" type="text"></input>

                        <label for="time-start">Start time</label>
                        <select id="time-start" className="time-select">
                            {hours.map((hour, idx) => (
                                <option key={idx} value={idx}>{hour}</option>
                            ))}
                        </select>

                        <label for="time-end">End time</label>
                        <select id="time-end" className="time-select">
                            {hours.map((hour, idx) => (
                                <option key={idx} value={idx}>{hour}</option>
                            ))}
                        </select>

                    </form>
                </div>
            </div>
            <div className="event-columns">
                <div className="hour-column">
                    {hours.map((hr, idx) => (
                        <div key={idx} className="hour-block">
                            <span>{hr}</span>
                        </div>
                    ))}
                </div>
                <div className="time-grid">
                    {
                        hours.map((hr, idx) => (
                            <div className="time-slot"></div>
                        ))
                    }
                </div>
                {
                    events.map((event, idx) => (
                        <Event event_name={event.event_name} start_time={event.start_time} end_time={event.end_time}/>
                    ))
                }
            </div>
        </div>
    )
}