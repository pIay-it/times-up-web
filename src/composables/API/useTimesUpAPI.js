import { inject } from "vue";

export default function useTimesUpAPI() {
    const timesUpAPI = inject("timesUpAPI");
    return { timesUpAPI };
}