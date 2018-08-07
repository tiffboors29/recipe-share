import React, { Component } from 'react';
import moment from 'moment';

import { Table } from '../../Components/Table';

import { fetchRecipes } from '../../services';

import columns from './columns';

class RecipeList extends Component {
  constructor() {
    super();
    this.state = {
      searchFilter: ''
    }
  }

  componentDidMount() {
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ author: profile.nickname || profile.name, authorId: profile.sub });
      });
    } else {
      this.setState({ author: userProfile.nickname || userProfile.name, authorId: userProfile.sub });
    }


    this.loadRecipesFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadRecipesFromServer, 2000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  loadRecipesFromServer = () => {
    let id = this.props.author && this.state.authorId;
    if (!id && this.props.author) return;
    fetchRecipes(id)
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.applyFilters(res.data);
      });
  }

  updateFilter = (e) => {
    let newState = { ...this.state };
    newState.searchFilter = e.target.value;
    this.setState(newState);

    this.applyFilters();
  }

  applyFilters = (data) => {
    data = data || this.state.data;

    if (this.state.searchFilter){
      let regex = new RegExp(this.state.searchFilter, 'i');
      data = data.filter(item => {
        return item.title.match(regex) || item.author.match(regex);
      });
    }

    this.setState({ data: data });
  }

  render() {

    let tableProps = {
      fetchUrl: "/recipes/",
      columns: columns,
      dataKeys: ['image', 'title', 'time', 'author', 'createdAt'],
      data: this.state.data,
      fetchKey: '',
      cellClassName: 'text-truncate',
      customRender: {
        image: {
          renderer: (item, props) => {
            if (item.image && item.image.data.data){
              let base64Data = new Buffer(item.image.data.data, 'binary').toString('base64');
              return (
                <div className="list-image-container">
                  <img className="" alt={ item.title } src={ `data:image/png;base64,${base64Data}` } />
                </div>
              )
            }
            return null;
          },
          className: 'table-image'
        },
        title: {
          renderer: (item, props) => {
            return (
              <a href={ props.fetchUrl + item._id }>
                { item.title }
              </a>
            )
          }
        },
        createdAt: {
          renderer: (item, props) => {
            let offset = moment().utcOffset();
            return moment.utc(item.createdAt).utcOffset(offset).format('MMM D, YYYY');
          }
        }
      }
    };

    return (
      <div className="main">
        <div className="recipes">
          
          <div className="search-field">
            <div className="form-group">
              <label className="control-label">Search:</label>
              <div>
                <input
                  className="form-control"
                  type="text"
                  name="search"
                  placeholder="Search by name or author"
                  value={ this.state.searchFilter }
                  onChange={ this.updateFilter }
                />
              </div>
            </div>
          </div>

          <Table { ...tableProps } />
        </div>
      </div>
    );
  }
};

export { RecipeList };