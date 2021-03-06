import React from 'react'
import { shallow } from 'enzyme'

import Sidebar from './SideBar'

const linkCreator = (num) =>
  Array(num).fill('link').map((link, index) => <li key={index}>{link}</li>)

describe('SideBar', () => {
  describe('given a sidebar component', () => {
    const props = {
      linskMarkUp: linkCreator(3),
      showSideBar: false,
      setShowSideBar: jest.fn()
    }
    afterEach(() => {
      jest.resetAllMocks()
    })
    describe('when trying to render the component', () => {
      const component = shallow(<Sidebar {...props}/>)
      it('should render the componet', () => {
        expect(component.length).toBe(1)
      })
      it('should render the sideBar overlay', () => {
        const shadow = component.find('.sidebar__overlay')

        expect(shadow.length).toBe(1)
        expect(shadow.hasClass('show')).toBe(false)
      })
      it('should render the panel', () => {
        const panel = component.find('.sidepanel')

        expect(panel.length).toBe(1)
        expect(panel.hasClass('show')).toBe(false)
      })
      it('should render all the links provided under side panel', () => {
        const panel = component.find('.sidepanel__links')

        expect(panel.props().children).toEqual(props.linskMarkUp)
      })
      describe('and userProfile is passed', () => {
        it('should render the userprofilecard', () => {
          const newProps = {
            ...props,
            userProfile: { exist: true }
          }
          const newComponent = shallow(<Sidebar {...newProps}/>)
          const userProfile = newComponent.find('UserProfileCard')

          expect(newComponent.find('.sidepanel__userprofile').length).toBe(1)
          expect(userProfile.length).toBe(1)
          expect(userProfile.props()).toEqual(newProps.userProfile)
        })
      })
      describe('and the the sidebar is set up to show', () => {
        const newProps = {
          ...props,
          showSideBar: true
        }
        const newComponent = shallow(<Sidebar {...newProps}/>)
        it('should show the sidebar overlay', () => {
          const shadow = newComponent.find('.sidebar__overlay')

          expect(shadow.hasClass('show')).toBe(true)
        })
        it('should show the sidebar panel', () => {
          const panel = newComponent.find('.sidepanel')

          expect(panel.hasClass('show')).toBe(true)
        })
      })
      describe('when clicking on the overlay', () => {
        it('should call the setShowSidebar', () => {
          const shadow = component.find('.sidebar__overlay')

          expect(props.setShowSideBar).not.toHaveBeenCalled()
          shadow.simulate('click')

          expect(props.setShowSideBar).toHaveBeenCalledTimes(1)
        })
      })
    })
  })
})
