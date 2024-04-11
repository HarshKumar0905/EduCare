// Returns formatted date and time
export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);
    console.log("Input Date : ", date);
  
    const hour = date.getHours();
    console.log("Hour : ", hour);
    const minutes = date.getMinutes()
    const period = hour >= 12 ? "PM" : "AM"
    const formattedTime = `${hour === 12 ? 12 : hour % 12}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`
  
    return `${formattedDate} | ${formattedTime}`
  }