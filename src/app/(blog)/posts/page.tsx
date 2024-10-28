import Layout from "@/components/Layout";

const Posts = async () => {

  const url = "/posts";
  return (
    <Layout>
      <p>{url}</p>
    </Layout>
  );
};

export default Posts;
