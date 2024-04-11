import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import {categories} from "../Services/API";
import {APIConnector} from "../Services/APIConnector";
import Footer from "../Components/Common/Footer";
import {getCatalogPageData} from "../Services/Operations/pageAndComponentData";
import Course_Card from "../Components/Core/Catalog/Course_Card";
import CourseSlider from "../Components/Core/Catalog/CourseSlider";

const Catalog = () => {
    const [loading, setLoading] = useState(false);
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [active, setActive] = useState(1);
    const {catalogName} = useParams();
    const [fCourses, setFCourses] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const res = await APIConnector("GET", categories.CATEGORIES_API);
            const category_id = res?.data?.data?.filter((ct) =>
            ct.name.split(" ").join("-").toLowerCase() ===
            catalogName)[0]._id;
            setCategoryId(category_id);
            setLoading(false);
        };
        getCategories();
    }, [catalogName]);
    const fetchFrequentlyBoughtTogether = () => {
        const length = catalogPageData?.data?.mostSellingCourses?.length;
        let index1, index2, index3, index4;
        const fCourses = [];
        index1 = Math.floor(Math.random()*length);
        fCourses[0] = catalogPageData?.data?.mostSellingCourses[index1];

        index2 = Math.floor(Math.random()*length);
        do{
            index2 = Math.floor(Math.random()*length);
        }
        while(index1===index2);
        fCourses[1] = catalogPageData?.data?.mostSellingCourses[index2];

        index3 = Math.floor(Math.random()*length);
        do{
            index3 = Math.floor(Math.random()*length);
        }
        while(index3===index1 || index3===index2);
        fCourses[2] = catalogPageData?.data?.mostSellingCourses[index3];

        index4 = Math.floor(Math.random()*length);
        do{
            index4 = Math.floor(Math.random()*length);
        }
        while(index4===index1 || index4===index2 || index4===index3);
        fCourses[3] = catalogPageData?.data?.mostSellingCourses[index4];

        return(fCourses);
    }

    useEffect(() => {
        const getCategoryDetails = async () => {
            try{
                setLoading(true);
                const res = await getCatalogPageData(categoryId);
                console.log("Result : ", res);
                if (res.success){
                    setCatalogPageData(res);
                }
                else 
                    setCatalogPageData(null);
                setLoading(false);
            }
            catch(error){
                console.error(error);
            }
        }
        getCategoryDetails();
    }, [categoryId]);

    if(loading){
        return(
            <div className="h-[calc(100vh-3.5rem)] flex justify-center items-center">
                <div className="spinner"></div>
            </div>
            
        );
    }
    return(
        <>
        {
            !catalogPageData ? (
                <div className="h-[calc(100vh-3.5rem)] flex justify-center items-center
                text-3xl text-richblack-300">
                    {" "}No Courses for the category{" "}
                </div>
            ) : (
                <>
                <div className="box-content bg-richblack-900">
                    <div className="bg-richblack-800 w-screen
                    border-b-[2px] border-richblack-700 flex xl:block">
                    <div className="mx-auto flex min-h-[260px] max-w-maxContentTab
                    flex-col justify-center gap-4 lg:max-w-maxContent">
                        <p className="text-sm text-richblack-300">
                            {`Home / Catalog / `}
                            <span className="text-[#00b0f0]">
                                {catalogPageData?.data?.selectedCategory?.name}
                            </span>
                        </p>
                        <p className="text-3xl text-richblack-5">
                            {catalogPageData?.data?.selectedCategory?.name}
                        </p>
                        <p className="max-w-[870px] text-richblack-200">
                            {catalogPageData?.data?.selectedCategory?.description}
                        </p>
                    </div>
                    </div>

                    <div className="mx-auto box-content w-full max-w-maxContentTab
                    px-4 py-12 lg:max-w-maxContent">
                        <div className="section_heading text-center xl:text-left">
                            Courses to get you started
                        </div>
                        <div className="mt-4 mb-8 flex border-b border-b-richblack-600 text-sm justify-center
                        xl:justify-start">
                            <p className={`px-4 py-2 ${
                              active === 1
                              ? "border-b border-b-[#00b0f0] text-[#00b0f0]"
                              : "text-richblack-50"
                              } cursor-pointer`}
                              onClick={() => setActive(1)}>
                                Most Popular
                            </p>
                            <p className={`px-4 py-2 ${
                              active === 2
                              ? "border-b border-b-[#00b0f0] text-[#00b0f0]"
                              : "text-richblack-50"
                              } cursor-pointer`}
                              onClick={() => setActive(2)}>
                                New
                            </p>
                        </div>
                        <div>
                            <CourseSlider
                              Courses={catalogPageData?.data?.selectedCategory?.courses}
                            />
                        </div>
                    </div>
                        
                    <div className="mx-auto box-content w-full max-w-maxContentTab
                    px-4 py-12 lg:max-w-maxContent">
                        <div className="section_heading text-center xl:text-left">
                            Your can also checkout courses in {catalogPageData?.data?.differentCategory?.name}
                        </div>
                        <div className="py-8">
                            <CourseSlider
                              Courses={catalogPageData?.data?.differentCategory?.courses}
                            />
                        </div>
                    </div>

                    <div className="mx-auto box-content w-full max-w-maxContentTab
                    px-4 lg:max-w-maxContent">
                        <p className="section_heading text-center xl:text-left">
                            Frequently Bought Together
                        </p>
                        <div className="py-8">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 w-[95%] md:w-full">
                                {catalogPageData?.data?.mostSellingCourses?.length === 0 ? (
                                    <p className=" text-xl text-white">
                                        No Most selling courses
                                    </p>
                                ) : (
                                    fetchFrequentlyBoughtTogether()?.map(
                                    (course, index) => (
                                      <Course_Card
                                      course={course}
                                      key={index}
                                      Height={"h-[400px]"}
                                      />
                                    )))
                                }
                            </div>
                        </div>
                    </div>x
                </div>
                <Footer/>
                </>
            )
        }  
        </>
    )
}

export default Catalog;