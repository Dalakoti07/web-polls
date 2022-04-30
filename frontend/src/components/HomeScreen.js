import styles from './HomeScreen.module.css'
import {useEffect, useState} from "react";
import io from "socket.io-client";
import ProgressBar from "@ramonak/react-progress-bar";
import {Loading} from "./Loading";
import webUrl from '../url_helper'
const axios = require('axios').default;

export const HomeScreen = () => {
    const [socket, setSocket] = useState(null);
    const [questionId, setQuestionId] = useState("")
    const [serverQuestionResponse, setServerQuestionResponse] = useState({})
    const [makingApiCall, setMakingApiCall] = useState(false)

    useEffect(()=>{
        // Parsing the query string using vanilla JS
        const id = window.location.search.split("=")[1];
        if(id!==undefined){
            console.log('question id is ',id);
            setQuestionId(id)
        }
    })

    function fetchDataFromSocket(){
        if(socket == null)
            return
        socket.emit("fetchQuestion",questionId)
        socket.on("questions", (data) => {
            console.log("response", data)
            setServerQuestionResponse(data)
        })
        socket.on("hello",(data)=>{
            console.log("hello from server....")
        })
    }

    function castAVote(option){
        try{
            setMakingApiCall(true)
            let result = axios.create({responseType: "json"}).post(`${webUrl}/polls/vote`, {
                questionId: questionId,
                option: option
            })
            setMakingApiCall(false)
        }catch (e) {
            setMakingApiCall(false)
        }
    }

    console.log("socket is", socket)

    useEffect(() => {
        const newSocket = io(`${webUrl}`);
        newSocket.on("connect", () => {
            setSocket(newSocket);
        })
        return () => newSocket.close();
    }, [setSocket]);

    return (
        <div className={styles.container}>
            <div className={styles.ribbon}>
                <a target={"_blank"} href="https://github.com/Dalakoti07/web-polls">Fork me on GitHub</a>
            </div>
            {socket ? (
                <div className={styles.hundred}>
                    {socket.connected ?
                        <p className={styles.conn_strip_green}>Socket is connected</p> :
                        <p className={styles.conn_strip_red}>Socket is not connected</p>
                    }
                </div>
            ) : (
                <div className={styles.conn_strip_red}>Connecting...</div>
            )}
            {makingApiCall? <Loading/>: null}
            <h1 className={styles.top_heading}>Web Polls</h1>
            <p className={styles.opening_para}>
                Paste poll id, below and enjoy
            </p>
            <input className={styles.input_field} value={questionId} onChange={(e)=>{
                setQuestionId(e.target.value)
            }}/>
            <button className={styles.btn} onClick={()=>{
                // fetch data from socket
                fetchDataFromSocket()
            }}>
                Search
            </button>
            {serverQuestionResponse.hasOwnProperty('_id')? <div className={styles.poll_div}>
                <div className={styles.question_div}>
                    <p className={styles.poll_question}>{serverQuestionResponse.pollQuestion}</p>
                </div>
                {serverQuestionResponse.options.map((value, idx)=>{
                    let percent = serverQuestionResponse.result[Number(idx)+1].percentage
                    return <div className={styles.option_div} key={idx}>
                        <ProgressBar className={styles.pb} completed={Math.round(percent)} margin={"10"} bgColor={"#383838"} padding={"4"}/>
                        <div className={styles.flex_row}>
                            <p key={value} className={styles.poll_option}>{value}</p>
                            <p
                                onClick={()=>{
                                    castAVote(idx+1)
                                }}
                                className={styles.vote_btn}>Vote</p>
                        </div>
                    </div>
                })}
            </div>: null}
        </div>
    )
}