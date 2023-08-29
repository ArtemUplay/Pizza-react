import ContentLoader from 'react-content-loader';

const MyLoader = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="135" cy="141" r="125" />
    <rect x="0" y="273" rx="10" ry="10" width="274" height="30" />
    <rect x="0" y="316" rx="15" ry="15" width="274" height="76" />
    <rect x="3" y="414" rx="10" ry="10" width="90" height="27" />
    <rect x="114" y="405" rx="25" ry="25" width="158" height="44" />
    <rect x="239" y="417" rx="0" ry="0" width="10" height="20" />
  </ContentLoader>
);

export default MyLoader;
