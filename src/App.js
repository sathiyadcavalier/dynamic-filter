import React from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      list: [{

        id: 1,
        data: { name: "Sathiyaseelan", screen_name: "instagram", followers_count: 1200, following_count: 1150, location: "Chennai", verified: true }

      },

      {

        id: 2,
        data: { name: "Ramanathan", screen_name: "facebook", followers_count: 500, following_count: 700, location: "Kanchipuram", verified: true }

      },

      {

        id: 2,
        data: { name: "Black Widow", screen_name: "twitter", followers_count: 35000, following_count: 7, location: "Chennai", verified: true }

      },

      {

        id: 2,
        data: { name: "Elon Musk", screen_name: "twitter", followers_count: 120000, following_count: 35, location: "Chennai", verified: true }

      },

      ],

      filter: [],

      filterDropDown: [
        {
          CONTAINS: { name: "Name", screen_name: "Screen Name", followers_count: "Followers Count", following_count: "Following Count", verified: "true" },
          CONDITIONS: { GTE: ">=", LTE: "<=", EQ: "=" }
        }
      ]

    };

    this.dummy = [];

  }

  getData = (item, index) => {

    return (

      <tr>

        <td>{item.data.name}</td>
        <td>{item.data.screen_name}</td>
        <td>{item.data.followers_count}</td>
        <td>{item.data.following_count}</td>
        <td>{item.data.location}</td>
        <td>{item.data.verified ? "Verified" : "Not Verified"}</td>

      </tr>

    )


  }

  delFilter = () => {

    this.dummy.pop();

    this.setState({ filter: [...this.dummy] })

    console.log(this.state.filter)


  }

  addFilter = () => {

    this.dummy.push(1);

    this.setState({ filter: [...this.dummy] })

    console.log(this.state.filter)


  }


  getFilterForm = () => {


    if (this.state.filter.length === 1) { 

    return (

      <form>

        <label for="CONTAINS">Where</label>

        <select name="CONTAINS" id="CONTAINS">

          {this.state.filterDropDown.map((item) => {

            return (

              <>

                <option>{item.CONTAINS.name}</option>
                <option>{item.CONTAINS.screen_name}</option>
                <option>{item.CONTAINS.followers_count}</option>
                <option>{item.CONTAINS.following_count}</option>

              </>

            )

          })}
        </select>

        <select name="CONDITIONS" id="CONDITIONS">

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

        <input type="text" />

        <span class="minus" onClick={() => this.delFilter()}><FontAwesomeIcon icon={faTrash} /></span>

      </form>

    )

  }

    if (this.state.filter.length >= 2) {

      return (

        <form>

          <select name="CONDITIONS" id="CONDITIONS">

            <option>AND</option>
            <option>OR</option>

          </select>

          <select name="CONTAINS-2" id="CONTAINS-2">

            {this.state.filterDropDown.map((item) => {

              return (

                <>

                  <option>{item.CONTAINS.name}</option>
                  <option>{item.CONTAINS.screen_name}</option>
                  <option>{item.CONTAINS.followers_count}</option>
                  <option>{item.CONTAINS.following_count}</option>

                </>

              )

            })}
          </select>

          <select name="CONDITIONS-2" id="CONDITIONS-2">

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

          <input type="text" />

          <span class="minus" onClick={() => this.delFilter()}><FontAwesomeIcon icon={faTrash} /></span>

        </form>
      )

    }


  }

render() {

  return (

    <>

      <div className='dynamicFilter-mainContainer'>

        <div className='filter-container'>

          <div className='filter-border'>

            <div className='form'>

              {this.state.filter.map(() => this.getFilterForm())}

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
