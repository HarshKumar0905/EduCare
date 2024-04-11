import React, { useRef, useState, useEffect } from "react";
import {Chart as ChartJS} from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const InstructorChart = ({courses}) => {
    const [currChart, setCurrChart] = useState('Students');

    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++){
            const color = `rgb(${Math.floor(Math.random()*256)}, 
            ${Math.floor(Math.random()*256)}, 
            ${Math.floor(Math.random()*256)})`;
            colors.push(color);
        }
        return colors;
    }

    const chartDataStudents = {
        labels : courses.map((course) => course.courseName),
        datasets : [
            {
                data : courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor : getRandomColors(courses.length),
                label : "Students Enrolled",
                borderRadius : 5
            }
        ]
    }
    const chartDataForIncome = {
        labels : courses.map((course) => course.courseName),
        datasets : [
            {
                data : courses.map((course) => course.totalAmountGenerated),
                backgroundColor : getRandomColors(courses.length),
                label : "Income From Each Course",
                borderRadius : 5
            }
        ]
    }

    return(
        <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
            <p className="text-lg font-bold text-richblack-5">
                Visualise
            </p>
            <div className="space-x-4 font-semibold">
                <button
                  onClick={() => setCurrChart('Students')}
                  className={`rounded-lg p-1 px-3 transition-all duration-200 ${
                    currChart === "Students"
                      ? "bg-richblack-700 text-[#00b0f0]"
                      : "text-[#00b0f087]"
                  }`}
                >
                    Student
                </button>
                <button
                  onClick={() => setCurrChart('Income')}
                  className={`rounded-lg p-1 px-3 transition-all duration-200 ${
                    currChart === "Income"
                      ? "bg-richblack-700 text-[#00b0f0]"
                      : "text-[#00b0f087]"
                  }`}
                >
                    Income
                </button>
            </div>
            <div className="relative mx-auto h-full w-full">
                <Bar data={currChart === "Students" ? chartDataStudents : chartDataForIncome}
                  options = {{
                    maintainAspectRatio : false
                }}
                />
            </div>
        </div>
    );
}

export default InstructorChart;