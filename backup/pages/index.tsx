import Head from "next/head"
import dynamic from "next/dynamic"

const indexStyle = require("@styles/pages/index.module.css")

/**
 * 组件
 */
import PageBox from "@components/common/tools/PageBox"
import NavBar from "@components/common/NavBar"
import NavBarMobile from "@components/common/NavBarMobile"
import HotTopics from "@components/common/HotTopics"
import Activities from "@components/common/Activities"
import Hitokoto from "@components/common/effects/Hitokoto"
import HotPosts from "@components/common/HotPosts"
import Notices from "@components/common/Notices"
import Newers from "@components/common/Newers"
import CopyrightBottom from "@components/common/CopyrightBottom"
import SchoolNews from "@components/common/school/SchoolNews"
import SomeIdea from "@components/common/SomeIdea"
import SchoolAcademicActs from "@components/common/school/SchoolAcademicActs"

import TypedDisplay from "@components/common/effects/TypedDisplay"
import Clock from "@components/common/effects/Clock"

/**
 * 测试按钮
 */
import TestSetBtn from "@components/auth/TestSetBtn"

/**
 * 粒子效果
 */
const ParticlesBackground = dynamic(
    import("@components/common/effects/ParticlesBackground"),
    {
        ssr: false,
    }
)

/**
 * 词云
 */
const WordCloud = dynamic(import("@components/charts/WordCloud"), {
    ssr: false,
})

/**
 * utils的工具函数
 */
import { welcome2Nucers } from "@utils/utils"
import { GetNUCCMSData } from "@utils/spider"
import { IIndexDataReq } from "@utils/requestInterfaces"
import { ICommonNewss } from "@utils/interfaces"

interface IHomeProps {
    academeicActs: ICommonNewss
    schoolNews: ICommonNewss
    data: IIndexDataReq
}

const Home = ({ academeicActs, schoolNews, data }: IHomeProps) => {
    welcome2Nucers()
    return (
        <PageBox>
            <Head>
                <title>Nucers社区 | 技术因分享而升华</title>
                <meta
                    name="keywords"
                    content="Community;BBS;Nucers;Technology;Share;"
                />
                <meta
                    name="description"
                    content="Nucers社区是一个倡导技术突破、经验共享的社区平台，以内容为核心突破传统学科束缚，致力于用户更好的进行跨学科技术交流"
                />
            </Head>
            <NavBar />
            <NavBarMobile />
            <ParticlesBackground />
            <TypedDisplay />
            <div className={indexStyle.content}>
                <div className={indexStyle.left}>
                    <Clock />
                    <HotTopics topics={data.topics} />
                    <WordCloud words={data.tags} />
                    <Newers newers={data.newers} />
                </div>
                <div className={indexStyle.right}>
                    <Hitokoto />
                    <div className={indexStyle.rightContent}>
                        <div className={indexStyle.contentLeft}>
                            <Activities acts={data.acts} />
                            <Notices notices={data.notices} />
                            <SchoolNews news={schoolNews} />
                            <SchoolAcademicActs acts={academeicActs} />
                        </div>

                        <div className={indexStyle.contentRight}>
                            <HotPosts posts={data.posts} />

                            <div className={indexStyle.ideaAndNewer}>
                                <SomeIdea ideas={data.ideas} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CopyrightBottom />
            <TestSetBtn />
        </PageBox>
    )
}

export const getServerSideProps = async () => {
    const academeicActs = await GetNUCCMSData("xshd", 5)
    const schoolNews = await GetNUCCMSData("zbxw", 10)
    // 访问失败情况处理
    const res = await fetch("http://localhost:8000")
    const result = await res.json()
    const data = result.data
    return {
        props: {
            academeicActs,
            schoolNews,
            data,
        },
    }
}

export default Home

/**
 * TODO: 更新之后组件样式注入有问题
 */
