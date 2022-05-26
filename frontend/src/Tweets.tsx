import React, { useState, useEffect } from 'react'
import { Button, TextareaField } from 'evergreen-ui'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function uploader(desc: string) {
  var formData = new FormData();
  formData.append("desc", desc);
  return axios
    .post(
      "http://127.0.0.1:8000/tweet/",
      formData,
      {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data;`,
        },
      }
    )
    .then((res) => {
      return res.data
    });
};

function retriver() {
  return axios
    .get(
      "http://127.0.0.1:8000/tweet/",
      {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data;`,
        },
      }
    )
    .then((res) => {
      return res.data
    });
};

interface RootObject {
  desc: string;
  id: number;
  pub_date: string;
}

function Tweets() {
  let navigate = useNavigate();
  const [value, setValue] = useState('')
  const [tweets, setTweets] = useState<RootObject[]>([])
  const [loading, setLoading] = useState(false)

  const submitTweet = async () => {
    setLoading(true)
    uploader(value).then(data => {
      setLoading(false)
      if(!data.error){
        setTweets([data, ...tweets])
        setValue('')
      }
    })
  }

  useEffect(() => {
    retriver().then(data => {
      if (!data.error) {
        setTweets(data)
      }
    })
  }, [])


  return (
    <div>
      <div className="site-layout">
        <div className="site-body mt-2">
          <div className="site-body-inner">
            <div className="grid">
              <div>
                <TextareaField
                  label="Create a tweet"
                  required
                  description="Write whatever you want between 50 to 2000 characters."
                  value={value}
                  onChange={(e: { target: { value: any } }) => setValue(e.target.value)}
                  marginBottom={5}
                  className="tweet-textarea"
                />
                <div className='w-full'>
                  <Button onClick={() => submitTweet()} isLoading={loading}>Submit</Button>
                  <Button marginLeft="auto" onClick={async () => {
                    navigate("/wallet");
                  }}>Go to Wallet</Button>
                </div>
              </div>

              {tweets.map((el, i) => (
                <div className="tweet" key={i}>
                  {el.desc}
                  <p className="time">- {el.pub_date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweets