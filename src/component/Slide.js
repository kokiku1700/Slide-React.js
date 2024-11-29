import { useEffect, useRef, useState } from 'react';
import img1 from '../img/img-1.jpg';
import img2 from '../img/img-2.jpg';
import img3 from '../img/img-3.jpg';
import img4 from '../img/img-4.jpg';
import './Slide.css';

const Slide = () => {
    //슬라이드에 보여질 이미지를 배열안에 객체로 저장
    const imgArr = [
        { img: img1, key: 1 },
        { img: img2, key: 2 },
        { img: img3, key: 3 },
        { img: img4, key: 4 },
    ];
    // 배열의 길이
    const imgLen = imgArr.length;
    // 이미지의 길이를 알기 위해 useRef를 사용
    const divRef = useRef(null);
    // 캐러셀의 이동을 위해 전체 이미지 길이
    const imgRef = useRef(divRef * imgLen);
    // 이미지의 길이를 구한 값을 useState에 저장
    const [imgWidth, setImgWidth] = useState(0);
    // 이미지의 인덱스 
    const [imgNum, setImgNum] = useState(0);
    
    // 이미지의 넓이를 구하는 코드
    useEffect(() => {
        if ( divRef.current ) {
            setTimeout(() => {
                const offsetWidth = divRef.current.offsetWidth;
                setImgWidth(offsetWidth);
            }, 100);

        };
    }, []);

    // 버튼을 클릭하면 imgNum에 변화가 생기면서 좌우로 이동한다.
    useEffect(() => {
        imgRef.current.style.transition = 'all .5s ease-in-out';
        imgRef.current.style.transform = `translateX(-${imgWidth * imgNum}px)`;
    }, [imgNum, imgWidth])

    // 이전 버튼
    const onClickPrev = () => {
        if ( imgNum < 1 ) {
            setImgNum(0);
        } else {
            setImgNum(imgNum - 1);
        }
    }

    //다음 버튼
    const onClickNext = () => {
        if ( imgNum > imgLen - 2 ) {
            setImgNum(imgLen - 1);
        } else {
            setImgNum(imgNum + 1);
        }
    }

    return (
        <div className="Slide" style={{width: imgWidth}}>
            <ul className='slides' ref={imgRef} style={{width: imgWidth * imgLen}}>
                {imgArr.map((e, idx) => (
                    <li className='slide' key={idx} ref={divRef}>
                        <img src={e.img} alt={`img${idx}`} />
                    </li>
                ))};
            </ul>
            <div>
                <button onClick={onClickPrev}>뒤로 가기</button>
                <button onClick={onClickNext}>앞으로 가기</button>
                <span>{imgNum + 1} / {imgLen}</span>
            </div>
        </div>
    );
};

export default Slide;