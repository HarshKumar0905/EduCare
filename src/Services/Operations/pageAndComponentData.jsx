import { APIConnector } from '../APIConnector';
import { catalogData } from '../API';

export const getCatalogPageData = async(categoryId) => {
  let result = [];
  try{
    const response = await APIConnector("POST", catalogData.CATALOGPAGEDATA_API, 
    {categoryId : categoryId});
    if(!response?.data?.success)
        throw new Error("Could not Fetch Category page data");
    result = response?.data;
  }
  catch(error){
    console.log("CATALOG PAGE DATA API ERROR....", error);
    result = error.response?.data;
  }
  return result;
}