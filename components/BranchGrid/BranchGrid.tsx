import styles from "./BranchGrid.module.css";

const BRANCHES = [
  {
    name: "강남점",
    address: "서울 강남구 도곡로7길 6, 한은빌딩 4층",
    current: true,
    url: "https://map.naver.com/p/search/fe%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%8B%9D%EC%84%BC%ED%84%B0%20%EA%B0%95%EB%82%A8/place/1961624906",
  },
  {
    name: "송파점",
    address: "서울 송파구 오금로 177, 2층",
    current: false,
    url: "https://map.naver.com/p/search/fe%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%8B%9D%EC%84%BC%ED%84%B0/place/1961789868",
  },
  {
    name: "공릉점",
    address: "서울 노원구 동일로 1055, 3층",
    current: false,
    url: "https://map.naver.com/p/search/fe%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%8B%9D%EC%84%BC%ED%84%B0/place/1216111320",
  },
  {
    name: "천안점",
    address: "충남 천안시 서북구 불당 25로 236\n디엠센텀시티 2층",
    current: false,
    url: "https://map.naver.com/p/search/fe%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%8B%9D%EC%84%BC%ED%84%B0/place/1149284242",
  },
];

export default function BranchGrid() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.eyebrow}>지점 안내</div>
      <div className={styles.grid}>
        {BRANCHES.map((branch, i) => (
          <a
            key={branch.name}
            href={branch.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.item} ${branch.current ? styles.current : ""} sr sr-d${i + 1}`}
          >
            <div className={styles.name}>{branch.name}</div>
            <div className={styles.tag}>
              {branch.address.split("\n").map((line, j) => (
                <span key={j}>
                  {line}
                  {j < branch.address.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
            <svg className={styles.arrow} width="25" height="25" viewBox="0 0 512 512" fill="currentColor"><path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zM140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12z"/></svg>
          </a>
        ))}
      </div>
    </div>
  );
}
