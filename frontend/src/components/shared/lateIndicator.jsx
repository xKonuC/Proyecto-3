import { calculateTime } from "../../utils/crudHelpers/utils";

export function LateIndicator({ lateMinutes }) {
    const { message, onTime } = calculateTime(lateMinutes);

    return (
        <span className={`${onTime ? 'bg-green-500' : 'bg-red-500'} px-2 py-1 text-center text-base font-bold text-white rounded`}>
            {message}
        </span>
    );
}
