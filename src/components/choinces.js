import React from 'react'
import axios from 'axios'
import { Button, ProgressBar } from 'react-bootstrap';
import { url } from '../config/config'
class Choices extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Questions: null,
            selectedOption: null,
            progressPercentage: 0,
            totalScore: 0
        }
    }
    handleSubmit = (event) => {
        document.querySelector('input[name="test"]:checked').checked = false;
        var submitTestData = {
            quesno: this.props.value.quesno,
            selectedOption: this.state.selectedOption
        }
        axios.post(`${url}/test/checkTest`, submitTestData)
            .then(this.handleResult)
        event.preventDefault();
    }
    handleResult = (response) => {
        let { marks, result, totalMarks } = response.data
        if (result == "correct") {
            if (totalMarks != this.state.totalScore) {
                this.setState(prevState => ({
                    totalScore: prevState.totalScore + marks,
                }))
            }
            if (this.state.progressPercentage < 100) {
                this.setState(prevState => ({
                    progressPercentage: ((100 / totalMarks) * (prevState.totalScore)).toFixed(2)
                }))
            }
        } else {
            this.setState(prevState => ({
                totalScore: prevState.totalScore - marks / 4,
            }))
            if (this.state.progressPercentage > 0) {
                this.setState(prevState => ({
                    progressPercentage: ((100 / totalMarks) * (prevState.totalScore)).toFixed(2)
                }))
            }
        }
    }
    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    }

    render() {
        let gotOptionsFromQuestion = this.props.value
        if (gotOptionsFromQuestion != null) {
            const progressInstance = <ProgressBar striped variant="success" now={this.state.progressPercentage} label={`${this.state.progressPercentage}%`} />;
            return (
                <div >
                    <form onSubmit={this.handleSubmit}>
                        <table align="center">
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>

                            <tr>
                                <td>1) <input type="radio" value={2} name="test" onChange={this.handleOptionChange} /></td>
                                <td>{gotOptionsFromQuestion.options[0].ch1}</td>
                            </tr>

                            <tr>
                                <td>2) <input type="radio" value={2} name="test" onChange={this.handleOptionChange} /></td>
                                <td>{gotOptionsFromQuestion.options[0].ch2}</td>
                            </tr>

                            <tr>
                                <td>3) <input type="radio" value={3} name="test" onChange={this.handleOptionChange} /></td>
                                <td>{gotOptionsFromQuestion.options[0].ch3}</td>
                            </tr>

                            <tr>
                                <td>4) <input type="radio" value={4} name="test" onChange={this.handleOptionChange} /></td>
                                <td>{gotOptionsFromQuestion.options[0].ch4}</td>
                            </tr>

                        </table>
                        <br />
                        <Button className="Submitbutton" type="submit"  >Submit</Button>
                    </form>
                    <div className="Progresbar">
                        {progressInstance}
                    </div>
                </div>


            )

        }
        else {
            return (
                <div></div>
            )
        }
    }
}

export default Choices
