import React from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

class App extends React.Component {

  constructor(props) {

    super(props);

    console.log("Hello World!!")

    this.state = {

      list: [],

      filter: [],

      filterDropDown: [
        {
          CONTAINS: { name: "Name", screen_name: "Screen Name", followers_count: "Followers Count", following_count: "Following Count", verified: "true" },
          CONDITIONS: { GTE: ">=", LTE: "<=", EQ: "=" }
        }
      ],


    };

    this.dummy = [];

  }


  componentDidMount() {

    const tableData = require("./data/tableData.json");
    this.setState({ list: tableData });

  }

  getData = (item, index) => {

    return (

      <tr>

        <td>{item.data.name}</td>
        <td>{item.data.screen_name}</td>
        <td>{item.data.followers_count}</td>
        <td>{item.data.following_count}</td>
        <td>{item.data.location}</td>
        <td>{item.data.verified ? "Yes" : "No"}</td>

      </tr>

    )


  }

  delFilter = (index) => {

    let filter = this.state.filter
    filter.splice(index, 1)
    this.setState({ filter })

    const tableData = require("./data/tableData.json");
    this.setState({ list: tableData });

  }

  addFilter = () => {

    let obj = { id: "", operator: "", value: "" }
    let filter = this.state.filter
    filter.push(obj)
    this.setState({ filter })


  }

  handleColumn = (event, index) => {

    let filter = this.state.filter;

    filter[index].id = event.target.value

    this.setState({ filter })


  }

  handleCondition = (event, index) => {

    let filter = this.state.filter;

    filter[index].operator = event.target.value

    this.setState({ filter })

  }

  handleInput = (event, index) => {

    let filter = this.state.filter;

    filter[index].value = event.target.value

    this.setState({ filter })

  }

  getFilterForm = (index) => {


    return (

      <>

        <label for="CONTAINS">{index >= 1 ? 'AND...': 'Where' }</label>

        <select id="CONTAINS" onChange={(event) => this.handleColumn(event, index)}>

          {this.state.filterDropDown.map((item) => {

            return (

              <>

                <option value="name">{item.CONTAINS.name}</option>
                <option value="screen_name">{item.CONTAINS.screen_name}</option>
                <option value="followers_count">{item.CONTAINS.followers_count}</option>
                <option value="following_count">{item.CONTAINS.following_count}</option>

              </>

            )

          })}

        </select>

        <select id="CONDITIONS" onChange={(event) => this.handleCondition(event, index)}>

          {this.state.filterDropDown.map((item) => {

            return (

              <>

                <option>{item.CONDITIONS.GTE}</option>
                <option>{item.CONDITIONS.LTE}</option>
                <option>{item.CONDITIONS.EQ}</option>

              </>

            )

          })}

        </select>

        <input type="text" onChange={(event) => this.handleInput(event, index)} />

        <span class="minus" onClick={() => this.delFilter(index)}><FontAwesomeIcon icon={faTrash} /></span>

      </>

    )



  }


  handleSumbit = () => {


    const originalList = require("./data/tableData.json");
    let list = []
    let loopList = originalList

    for (let j = 0; j < this.state.filter.length; j++) {

      if (j != 0) {

        loopList = list
        list = []

      }

      for (let i = 0; i < loopList.length; i++) {

        let item = loopList[i];

        let filter = this.state.filter[j]

        if (filter.operator == ">=") {

          if (item.data.followers_count >= filter.value) {

            list.push(item)

          }

        }

        if (filter.operator == "<=") {

          if (item.data.followers_count <= filter.value) {

            list.push(item)

          }

        }

        if (filter.operator == "=") {

          if (item.data.followers_count == filter.value) {

            list.push(item)

          }

          if (item.data.name == filter.value) {

            list.push(item)

          }

          if (item.data.screen_name == filter.value) {

            list.push(item)

          }

        }

      }

    }

    this.setState({ list })

  }

  render() {

    return (

      <>

        <div className='dynamicFilter-mainContainer'>

          <div className='filter-container'>

            <div className='filter-border'>

              <div className='form'>

                {this.state.filter.map((item, index) => this.getFilterForm(index))}

                <div id="submit" onClick={this.handleSumbit}>Submit</div>

                <div className='filter-deco'>

                  <span onClick={() => this.addFilter()}> <FontAwesomeIcon icon={faPlus} /> Add Filter</span>

                </div>

              </div>

            </div>

          </div>


          <div className='table'>

            <table>

              <tr>

                <th>Name</th>
                <th>Screen Name</th>
                <th>Followers Count</th>
                <th>Following Count</th>
                <th>Location</th>
                <th>Verified</th>

              </tr>

              {this.state.list.map((item, index) => this.getData(item, index))}

            </table>

          </div>

        </div>

      </>

    );

  }
}

export default App;
