import { CalendarOneDayIcon } from "../Icons/CalenderOneDayIcon";
import ForecastIcon from "../Icons/ForecastIcon";
import { USDCircle } from "../Icons/USDCircle";


export const Icon = (type, className="") => {
    switch(type) {
        case 'Deal':
            return <USDCircle className={className} />
        case 'Activity':
            return <CalendarOneDayIcon className={className} />
        case 'Forecast':
            return <ForecastIcon className={className} />
        default:
            return null;
    }
}