import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// Enzyme is a wrapper around React test utilities which makes it easier to
// shallow render and traverse the shallow rendered tree. 
import LoginButton from '../client/App/components/LoginButton';
import SearchBar from '../client/App/components/SearchBar';
import SearchResult from '../client/App/components/SearchResult';
import SignupButton from '../client/App/components/SignupButton';


// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  xdescribe('LoginButton', () => {
    let wrapper;
    const props = {
      
    };

    beforeAll(() => {
      wrapper = shallow(<LoginButton {...props} />);
    });

    it('Render one button', () => {
      // expect(wrapper.type()).toEqual('p');
      // expect(wrapper.text()).toEqual('Mega: Markets');
      expect(wrapper.find('button')).toHaveLength(1);
    });
  });

  describe('SearchResult', () => {
    let wrapper;
    const props = {
      timeout: 5,
      book : {
        title: 'Lord of the Rings',
        author: 'J. R. R. Tolkien',
        selfLink: 'www.fakelink.com'
      },
    }

    beforeAll(() => {
      wrapper = shallow(<SearchResult {...props} />)
    })

    it('Renders a <button> tag with an onClick attribute', () => {

      expect(wrapper.find('button').type()).toEqual('button')
      
// Mo was working ehre


    })







  })


  // TODO: Test the following: 
    // 1. A MarketDisplay should display all of its text props inside a
    // LabeledText component
    // 2. It should also contain a div with two buttons
    // 3. The functions passed down should be invoked on click
    // 4. MarketDisplay should render a div with a class of `marketBox`, and the
    // interior div wrapping the two buttons should have a class of `flex`
//   describe('MarketDisplay', () => {
//     let wrapper;
//     const props = {
//       index: 4,
//       location: 'Los Angeles',
//       cards: 2,
//       percentage: 20.50,
//       addCard: function(){
//         props.cards = props.cards + 1;
//       },
//       deleteCard: jest.fn()
//     };

//     beforeAll(() => {
//       wrapper = shallow(<MarketDisplay {...props} />);
//     });

//     it('Renders 4 Labeled text components', () => {
//       expect(wrapper.find(LabeledText)).toHaveLength(4);
//       // const labeledTexts = wrapper.find(LabeledText).map((node) => node.props().text);
//       //expect(labeledTexts).toEqual(Object.values(props))
//       expect(wrapper.find('[label="Location"]').prop('text')).toMatch(props.location);
//       expect(wrapper.find('[label="Market ID"]').prop('text')).toBe(props.index);
//       expect(wrapper.find('[label="Cards"]').prop('text')).toBe(props.cards);
//       expect(wrapper.find('[label="% of total"]').prop('text')).toBe(props.percentage);
//     });
  
//     it('Contains div element with two button', () => {
     
//       expect(wrapper.find('div.flex').children('button')).toHaveLength(2);
//       // expect(wrapper.find('div').children('button')).toHaveLength(2);
//       //works bc enzyme seraches resucrivsely
//       //find(div).at(1)
//     });

//     it('Should invoke functions passed down on click of button', () => {
//       wrapper.find('div.flex').children('button.addCard').simulate('click');
//       wrapper.find('div.flex').children('button.addCard').simulate('click');
//       // wrapper.find('.addCard').simulate('click');
//       // wrapper.find('.deleteCard').simulate('click');
//       expect(props.cards).toEqual(4);
//       wrapper.find('div.flex').children('button.deleteCard').simulate('click');
//       expect(props.deleteCard.mock.calls.length).toEqual(1);
//       // expect(addCardMock).toHaveBeenCalled();
//       // expect(deleteCardMock).toHaveBeenCalled();

//       // wrapper.find('button').forEach(node => node.simulate('click'))
//       // expect(mock1.mock.calls).toHaveLength(2)

//     });

//     it('Renders div with class of marketBox and an interior div with the class of flex', () => {
//       expect(wrapper.find('div.marketBox')).toHaveLength(1);
//       expect(wrapper.find('div.marketBox').children('div.flex')).toHaveLength(1);
//       //expect(wrapper).hasClass('marketBox')).toBe(true)
//     });

//   });

//   describe('MarketsDisplay', () => {
//     // TODO: Test the following:
//     //   1. A MarketsDisplay should have an h4 element to display the 'Markets'
//     //   title
//     //   2. A single MarketDisplay is rendered for each market in the
//     //   marketList prop
//     //   3. The percentage prop should be a string calculated to two decimals.
//     //   Test for zero, a whole number, and a fractional value. (Right now this
//     //   is implemented incorrectly, so follow TDD here)
//     let wrapper;
//     const props = {
//       totalCards: 12,
//       marketList: [{location: 'test', cards: 9}],
//       addCard: jest.fn(),
//       deleteCard: jest.fn()
//     };

//     beforeAll(() => {
//       wrapper = shallow(<MarketsDisplay {...props} />);
    // });

  // });
});
