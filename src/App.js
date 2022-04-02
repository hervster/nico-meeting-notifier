import nicoOne from './Nico1.jpg'
import nicoTwo from './Nico2.jpg'
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import mongoose from 'mongoose';
import express from 'express';

const imagesPath = {
  yes: nicoTwo,
  no: nicoOne
}

const backColor = {
no: '#0cf31f',
yes: '#fa2509'
}

// DB Stuff ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const meetingStateSchema = new mongoose.Schema({meetState: Boolean});
const meetingState = mongoose.model("inMeeting", meetingStateSchema);

const app = express.Router()

const createMeetingState = async () => {
  const NicoMeetingState = await new meetingState();
  return NicoMeetingState
}

const updateMeetingState = async (response) => {
  const meetingState = await meetingState.findOne({})
  meetingState.meetState = response 
  await meetingState.save()
  return meetingState
}

app.get("/", async (req, res ) => {
  let response = await createMeetingState()
  return response
})

app.put("/", async (req, res ) => {
  let response = await updateMeetingState()
  return response
})

app.listen(5000, () => console.log('API is running...'))