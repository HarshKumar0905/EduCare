import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { markLectureAsComplete } from "../../../Services/Operations/courseDetailsAPI";
import { updateCompletedLectures } from '../../../Slices/ViewCourseSlice';
import { Player, BigPlayButton } from "video-react";
import 'video-react/dist/video-react.css';
import IconBtn from "../../Common/IconBtn";

const VideoDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {courseId, sectionId, subSectionId} = useParams();
    const {token} = useSelector((state) => state.Auth);
    const playerRef = useRef();
    const {courseSectionData, courseEntireData, completedLectures} = 
    useSelector((state) => state.ViewCourse);
    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [previewSource, setPreviewSource] = useState("");

    useEffect(() => {
        const setVideoSpecificDetails = async () => {
            if(!courseSectionData.length)
                return;
            if(!courseId || !sectionId || !subSectionId)
                navigate('/dashboard/enrolled-courses');
            const filteredData = courseSectionData.filter(
                (sec) => sec._id === sectionId);
            const filteredVideoData = filteredData?.[0].subSection.filter(
                (video) => video._id === subSectionId);
            setVideoData(filteredVideoData);
            setVideoEnded(false);
        }
        setVideoSpecificDetails();
    }, [courseEntireData, courseSectionData, location.pathname]);

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (data) => data._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.
        subSection?.findIndex((data) => data._id === subSectionId);
        if(currentSectionIndex === 0 && currentSubSectionIndex === 0)
            return true;
        else
            return false;
    }
    const isLastVideo = () => {
        const noOfSections = courseSectionData.length;
        const currentSectionIndex = courseSectionData?.findIndex(
            (data) => data._id === sectionId);
        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.
        findIndex((data) => data._id === subSectionId);
        if(currentSectionIndex === (noOfSections-1) && 
        currentSubSectionIndex === (noOfSubSections -1))
            return true;
        else
            return false;
    }
    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (data) => data._id === sectionId);
        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.
        findIndex((data) => data._id === subSectionId);

        if(currentSubSectionIndex !== noOfSubSections-1){
            const nextSubSectionId = courseSectionData[currentSectionIndex].
            subSection[currentSubSectionIndex + 1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        }
        else{
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
            const nextSubSectionId = courseSectionData[currentSectionIndex + 1].
            subSection[0]._id;
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
        }
    }
    const goToPrevVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (data) => data._id === sectionId);
        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.
        findIndex((data) => data._id === subSectionId);

        if(currentSubSectionIndex !== 0){
            const prevSubSectionId = courseSectionData[currentSectionIndex].
            subSection[currentSubSectionIndex - 1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
        }
        else{
            const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
            const prevSubSectionId = courseSectionData[currentSectionIndex - 1].
            subSection[noOfSubSections-1]._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
        }
    }
    const handleLectureCompletition = async () => {
        setLoading(true);
        const result = await markLectureAsComplete({
        courseId: courseId, subSectionId: subSectionId}, token);
        console.log("Result : ", result);
        if(result)
            dispatch(updateCompletedLectures(subSectionId));
        console.log("Hello");
        setLoading(false);
    }

    return(
        <div>
        {
            !videoData ? (
                <div className="h-[calc(100vh-3.5rem)] flex justify-center items-center
                text-3xl text-richblack-300">
                    {" "}No Data Found{" "}
                </div>
            ) : (
                <Player
                  ref = {playerRef}
                  aspectRatio="16:9"
                  playsInline
                  onEnded={() => setVideoEnded(true)}
                  src={videoData[0]?.videoUrl}
                  className="mt-20 border-richblack-700 border-[2px]">
                    <BigPlayButton position="center" />
                    {
                        videoEnded && (
                            <div style={{
                                backgroundImage : 
                                "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",}}
                            className="full absolute inset-0 z-[100] grid h-full 
                            place-content-center font-inter">
                            {
                                !completedLectures?.includes(subSectionId) && (
                                    <IconBtn
                                      disabled={loading}
                                      onClick = {() => handleLectureCompletition()}
                                      text={!loading ? 'Mark As Completed' : 'Loading...'}
                                      customClasses="text-xl max-w-max px-4 mx-auto"
                                    />
                                )
                            }
                            <IconBtn
                              disabled={loading}
                              onClick = {() => {
                                if(playerRef?.current){
                                    playerRef.current?.seek(0);
                                    setVideoEnded(false);
                                }
                              }}
                              text="Rewatch"
                              customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                            />
                            <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                            {
                                !isFirstVideo() && (
                                    <button
                                      disabled={loading}
                                      onClick={goToPrevVideo}
                                      className="blackButton
                                      transition-all duration-200 hover:scale-95"
                                    >Prev</button>
                                )
                            }
                            {
                                !isLastVideo() && (
                                    <button
                                      disabled={loading}
                                      onClick={goToNextVideo}
                                      className="blackButton
                                      transition-all duration-200 hover:scale-95"
                                    >Next</button>
                                )
                            }
                            </div>
                            </div>
                        )
                    }
                </Player>
            )
        }
        <div className="mt-8 ml-8">
            <h1 className="text-3xl font-semibold text-richblack-400">
                {videoData[0]?.title}
            </h1>
            <p className="py-2 text-richblack-400">
                {videoData[0]?.description}
            </p>
        </div>
        </div>
    );
}

export default VideoDetails;