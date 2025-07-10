import React, { useState, useRef, useMemo, useContext, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Button } from "@/components/ui/button";
import MyContext from "../context/MyContext";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

const About = () => {
  const [value, setValue] = useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");

  console.log(content);
  const { refreshAccessToken, isTokenExpire } = useContext(MyContext);

  const fetchAbout = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://aayan.samadhaangroups.co.in/api/v1/about/get-about",
      };
      const response = await axios.request(config);
      console.log(response);
      setValue(response.data.data);
      // if (response.data.data && response.data.data.length > 0) {
      //   setContent(response.data.data[0].content);
      // }
    } catch (error) {
      toast.error("Failed to fetch services");
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  useEffect(() => {
    if (value && value[0]?.content) {
      setContent(value[0].content);
    }
  }, [value]);

  console.log(value);

  const aboutSubmit = async () => {
    const val = isTokenExpire();
    if (val) {
      await refreshAccessToken();
    }
    try {
      const Token = Cookies.get("accessTokenAdmin");

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://aayan.samadhaangroups.co.in/api/v1/about/update-about",
        headers: {
          Authorization: `Bearer ${Token}`,

          Accept: "application/json",
        },
        data: {
          
            content: content,
            id: value[0]?._id,
          
        },
      };
      const response = await axios.request(config);
      console.log(response);
      toast.success("About added successfully");
      fetchAbout();
    } catch (error) {
      toast.error(error?.response?.data?.message );
      console.log(error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <JoditEditor
            ref={editor}
            value={content}
            // config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <div>
          <div className="w-full h-full p-4 border border-gray-300 rounded-lg overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">About Content</h2>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center p-6">
        <Button onClick={aboutSubmit}>Update About Content</Button>
      </div>
    </div>
  );
};

export default About;
