import React from 'react'
import axios from 'axios'
import Choices from './choinces'
import { ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap'
import { url } from '../config/config'
import '../App.css'
 
class Questions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Questions: null,
      selectedOption: null,
    }

  }
  componentDidMount() {
    axios.get(`${url}/test`)
      .then(response => {
        this.setState({
          Questions: response.data
        })
      })

  }

  getQuestions = () => {
    let arr = []
    this.state.Questions.questions.forEach(element => {
      let data = <option key={element._id} value={element.quesno}>{`${element.quesno}) ${element.question} (${element.marks} Marks) `} </option>
      arr.push(data)
    })
    return arr
  }

  handleChange = (event) => { 
    this.setState({
      selectedOption: this.state.Questions.questions[event.target.value - 1]
    })
  }

  render() {
    let { Questions } = this.state
    if (Questions != null) {
      return (
        <div className="">
          <div className="Heading">NodeJS MCQ</div>
          <select className ="Select" id="drop" onChange={this.handleChange}>
            <option>Select Questions</option>
            {this.getQuestions()}
          </select>
          <Choices value={this.state.selectedOption} />
        </div>
      )
    }
    else {
      return (
        <h4></h4>
      )
    }
  }
}

export default Questions
