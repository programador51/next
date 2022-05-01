import axios from "axios";
import Devit from "components/Devit";

export default function DevitPage(props) {
  console.log(props);

  return (
    <>
      <Devit {...props} />
    </>
  );
}
// DevitPage.getInitialProps = async (context) => {
//   const { query } = context;
//   const { id } = query;

//   const { data } = await axios.get(`http://localhost:3000/api/devits/${id}`);

//   return data;
// };

export async function getServerSideProps(context) {
  const { params, res, req, query } = context;
  const { id } = params;

  const { data } = await axios.get(`http://localhost:3000/api/devits/${id}`);

  return {
    props: data,
  };
}

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: "8gEvfDRJv9rtxIM8Lwyf" } }],
//     fallback: false,
//   };
// }

// export async function getStaticProps(context) {
//   const { params, res, req, query } = context;
//   const { id } = params;

//   const { data } = await axios.get(`http://localhost:3000/api/devits/${id}`);

//   return {
//     props: data,
//   };
// }
