import { List, Spin } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

const ClientsList = () => {

    return (
        <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={this.handleInfiniteOnLoad}
        hasMore={!this.state.loading && this.state.hasMore}
        useWindow={false}
      >
        <List
          dataSource={this.state.data}
          renderItem={item => (
            <List.Item key={item.id}>
              {item.name}
            </List.Item>
          )}
        >
          {this.state.loading && this.state.hasMore && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
        </List>
      </InfiniteScroll>
    )
}


/**
 * Ultimate button component
 * @typedef Knopka
 * @param {boolean} isComposite
 */
const Knopka = (props) => {
  const { isComposite, left, top, innerLeft, innerTop, text, innerClassName } = props;

  return (
    <React.Fragment>
      <>
        <div className={"button " + !isComposite && 'position-absolute'}
             style={{left: left + 'px', top: top + "px"}}>
          <span style={{ left: innerLeft + 'px', top: innerTop + 'px' }}
                className={"position-absolute " + innerClassName ? innerClassName : ''}>
            {text}
          </span>
        </div>
      </>
    </React.Fragment>
  )
}

export default Knopka;

const falseStyle = `
.false {
  disblay: none;
}
`
