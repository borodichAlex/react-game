import React from 'react'

const Footer = () => {
  const styles = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  };

  return (
    <footer style={styles}>
      <a href="https://github.com/borodichAlex">Github Borodich Alexander</a>
      <span>Backgammon - 2021</span>
      <img src="https://rs.school/images/rs_school_js.svg" alt="logo RS School" title="logo RS School" width="90px"/>
      <a href="https://rs.school/react/">Link to React Course</a>
    </footer>
  )
}

export default Footer;


