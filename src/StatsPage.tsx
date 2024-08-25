import React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Rectangle,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { Interfaces } from "./interfaces";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const CHART_HEIGHT = 600;

const Chart = (props: { 
    dp_data: any,
    dp_dataKey: string,
    dp_title: string,
}) => {
    const { dp_title, dp_data, dp_dataKey } = props;

    return (
        <div className="flex flex-col">
            <div className="text-center font-bold text-lg">{dp_title}</div>
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <BarChart
                    width={500}
                    height={CHART_HEIGHT}
                    data={dp_data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 120,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={dp_dataKey} angle={-90} textAnchor="end"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar
                        dataKey="count"
                        fill="#08CD90"
                        activeBar={
                            <Rectangle fill="#8B3DFF" stroke="black"/>
                        }
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export const StatsPage = (props: {
    dp_manifests: Interfaces.Manifest[]
}) => {
    const layouts = props.dp_manifests.reduce(
        (acc: string[], manifest: Interfaces.Manifest) => {
            const {p_layout} = manifest.params;

            if (acc.includes(p_layout)) {
                return acc;
            }

            return [...acc, p_layout];
        },
        []
    );

    const themes = props.dp_manifests.reduce(
        (acc: string[], manifest: Interfaces.Manifest) => {
            const {theme} = manifest;

            if (acc.includes(theme)) {
                return acc;
            }

            return [...acc, theme];
        },
        []
    );

    const layoutData = layouts.map((layout: string) => {
        return {
            layout,
            count: props.dp_manifests.filter((m => m.params.p_layout === layout)).length
        };
    }).sort((a, b) => b.count - a.count);

    const themeData = themes.map((theme: string) => {
        return {
            theme,
            count: props.dp_manifests.filter((m => m.theme === theme)).length
        };
    }).sort((a, b) => b.count - a.count);

    const dayValues = DAY_NAMES.map(day => {
        return {
            day,
            count: 0
        }
    });

    props.dp_manifests.forEach((manifest: Interfaces.Manifest) => {
        const date = new Date(manifest.date);
        const dayIndex = date.getDay();
        dayValues[dayIndex].count = dayValues[dayIndex].count + 1;
    });

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-8">
            <Chart dp_data={layoutData} dp_dataKey="layout" dp_title="Logo Layout Frequency"/>
            <Chart dp_data={themeData} dp_dataKey="theme" dp_title="Theme Frequency"/>
            <Chart dp_data={dayValues} dp_dataKey="day" dp_title="Day Frequency"/>
        </div>
     )
}