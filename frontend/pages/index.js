
import Hero from '../components/hero';
import Search from '../components/search'
import Login from '../components/login/loginComponent'
import nookies from 'nookies'
import axios from 'axios'
import https from 'https'

const Homepage = () => {
    return ( <section className="auth"><Login /></section>);
}

export const getServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx)
    let user = null;
    const agent = new https.Agent({  
        rejectUnauthorized: false
      });
    if (cookies?.jwt) {
      try {
        const { data } = await axios.get('https://api.dessertcorner.com/api/users/me', {
          headers: {
            Authorization:
              `Bearer ${cookies.jwt}`,
            },
            httpsAgent: agent ,
        });
        user = data;
      } catch (e) {
        console.log(e);
      }
    }
  
    if (user) {
      return {
        redirect: {
          permanent: false,
          destination: '/homepage'
        }
      }
    }
  
    return {
      props: {}
    }
  }
 
export default Homepage;
