import React, {useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useChooseAFare, useFlightPackageById} from "../api";
import "./FlightList.scss";

import TeaserCard from "../components/TeaserCard";
import FlightPackage from "../components/FlightPackage";
import DestinationInfo from "../components/static/DestinationInfo";
import TimelineInfo from "../components/static/TimelineInfo";
import OutboundSteps from "../components/static/OutboundSteps";
import FlightTabs from "../components/static/FlightTabs";


const FlightList = () => {
    const [fetchTrigger, setFetchTrigger] = useState(true);
    const navigate = useNavigate();

    const economyBasicPackage = useFlightPackageById("economy-basic", "master", fetchTrigger);
    const businessPackage = useFlightPackageById("business", "master", fetchTrigger);

    const packages = [economyBasicPackage, businessPackage];
    const {data} = useChooseAFare("master", fetchTrigger);

    function getAllPackages() {
        return packages.map((offer, index) => (
            <FlightPackage
                key={offer?.packageId || index}
                cf={offer?.data}
                navigate={navigate}
            />
        ));
    }


    return (
        <>
            <OutboundSteps />
            <DestinationInfo/>
            <TimelineInfo />
            <FlightTabs>
                <TeaserCard cf={data} title="Teaser" style={{backgroundColor: "#dfe7f2"}}/>
                <div className="column-container">
                    {getAllPackages()}
                </div>
            </FlightTabs>

        </>
    );
};

export default FlightList;
