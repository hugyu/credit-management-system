export const handleDate = (date: string | undefined) => {
    return date ? new Date(date).toISOString().split("T")[0] : "";
};
export const formatDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始，需要加 1
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}