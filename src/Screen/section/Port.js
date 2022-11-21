import React, { useState } from 'react'
import Slider from 'react-slick';

import BoxCardItem from '../../components/BoxCardItem'
import Pagination from '../../components/Pagination';
import BoxSearch from '../../components/BoxSearch';
import BoxSelect from '../../components/BoxSelect';

import Description from '../../components/Description';

function Port() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const [readPost, setReadPost] = useState({
        read: false,
        data: null,
    })
    const [data, setData] = useState([
        {
            image: [],
            title: "Bán ccmn nhà trọ cho thuê 5 tầng 9 ngủ tại Ô Chợ Dừa - Đê La Thành - Đống Đa - HN 50tr/ tháng",
            date: "17/11/2022",
            map: "470 tran dai nghia quan ngu hanh son ",
            price: 58757585887,
            area: 4550,
            province: "Da nang",
            star: 4,
            description: "- Vị trí cách đường ô tô: Xã Đàn - ngã 6 Ô Chợ Dừa 100m, ngõ 298 Đê La Thành ngay trung tâm thành phố HN. - Nhà dịch vụ cao cấp An House Homestay 5 tầng, bds dòng tiền đang cho thuê 50tr/ tháng, hợp đồng dài hạn. - Sẵn 100% tiện ích đồ dùng sinh hoạt: Bàn ghế gỗ, ghế sofa, /chăn ga gối đệm/tủ bát, tủ bếp, tủ quần áo/lò vi sóng, bếp từ, nồi nấu bếp từ, hút mùi, nóng lạnh, điều hoà, quạt trần/ máy giặt, máy sấy quần áo. - Liên hệ chính chủ để xem nhà nhanh gọn, không qua môi giới."
        },
        {
            image: [],
            title: "2 Bán ccmn nhà trọ cho thuê 5 tầng 9 ngủ tại Ô Chợ Dừa - Đê La Thành - Đống Đa - HN 50tr/ tháng",
            date: "18/11/2022",
            map: "550 tran dai nghia quan ngu hanh son ",
            price: 58757585887,
            area: 750,
            province: "Da nang",
            star: 5,
            description: "- Vị trí cách đường ô tô: Xã Đàn - ngã 6 Ô Chợ Dừa 100m, ngõ 298 Đê La Thành ngay trung tâm thành phố HN. - Nhà dịch vụ cao cấp An House Homestay 5 tầng, bds dòng tiền đang cho thuê 50tr/ tháng, hợp đồng dài hạn. - Sẵn 100% tiện ích đồ dùng sinh hoạt: Bàn ghế gỗ, ghế sofa, /chăn ga gối đệm/tủ bát, tủ bếp, tủ quần áo/lò vi sóng, bếp từ, nồi nấu bếp từ, hút mùi, nóng lạnh, điều hoà, quạt trần/ máy giặt, máy sấy quần áo. - Liên hệ chính chủ để xem nhà nhanh gọn, không qua môi giới."
        },
        {
            image: [],
            title: "3 Bán ccmn nhà trọ cho thuê 5 tầng 9 ngủ tại Ô Chợ Dừa - Đê La Thành - Đống Đa - HN 50tr/ tháng",
            date: "19/11/2022",
            map: "980 tran dai nghia quan ngu hanh son ",
            price: 58757585887,
            area: 50,
            province: "Quang Nam",
            star: 1,
            description: "- Vị trí cách đường ô tô: Xã Đàn - ngã 6 Ô Chợ Dừa 100m, ngõ 298 Đê La Thành ngay trung tâm thành phố HN. - Nhà dịch vụ cao cấp An House Homestay 5 tầng, bds dòng tiền đang cho thuê 50tr/ tháng, hợp đồng dài hạn. - Sẵn 100% tiện ích đồ dùng sinh hoạt: Bàn ghế gỗ, ghế sofa, /chăn ga gối đệm/tủ bát, tủ bếp, tủ quần áo/lò vi sóng, bếp từ, nồi nấu bếp từ, hút mùi, nóng lạnh, điều hoà, quạt trần/ máy giặt, máy sấy quần áo. - Liên hệ chính chủ để xem nhà nhanh gọn, không qua môi giới."
        },
    ])
    const HandlerRead = (data) => {
        setReadPost({
            read: true,
            data: data,
        })
    }
    const HandlerVisible = () => {
        if (readPost.read) {
            return <Description data={readPost.data}></Description>
        } else {
            return <div className="boxPost">
                <div className="filterData">
                    {/* <select className="filterData_select" name="price" id="price">
<option value="increase">increase</option>
<option value="reduce">reduce</option>
</select> */}
                    <BoxSelect></BoxSelect>
                    <BoxSearch></BoxSearch>
                </div>
                <p className="boxTitle">Post</p>
                <div className="boxCard">
                    {
                        data.map((item, index) => {
                            return <BoxCardItem key={index} data={item} handler={HandlerRead}></BoxCardItem>
                        })
                    }
                </div>
                <Pagination></Pagination>
                <p className="boxTitle">Featured Posts</p>
                <div className="slider">
                    <Slider {...settings}>
                        {/* <BoxCardItem></BoxCardItem>
        <BoxCardItem></BoxCardItem>
        <BoxCardItem></BoxCardItem>
        <BoxCardItem></BoxCardItem>
        <BoxCardItem></BoxCardItem>
        <BoxCardItem></BoxCardItem> */}
                    </Slider>
                </div>
            </div>
        }
    }
    return (
        <div className="colSection">
            <HandlerVisible></HandlerVisible>
        </div>
    )
}

export default Port