import * as TreeMapAggregatedAlarmsDataModel from '../TreeMapAggregatedAlarmsDataModel'

const ALARMS =
    [
        {
            asn_name: 'SOTCOM-AS JSC Telephone Company "Sotcom"',
            asn: '34467',
            country_iso_code2: 'RU',
            country_iso_code3: 'RUS',
            country_name: 'Russia',
            hegemony_alarm_counts: [1],
            hegemony_alarm_timebins: ['2023-08-10T00:00:00Z'],
            hegemony_alarm_severities: ['high'],
            network_delay_alarm_counts: [1],
            network_delay_alarm_timebins: ['2023-08-10T00:15:00Z'],
            network_delay_alarm_severities: ['high'],
            moas_alarm_counts: [1],
            moas_alarm_timebins: ['2023-08-10T11:15:00Z'],
            moas_alarm_severities: ['high'],
            submoas_alarm_counts: [],
            submoas_alarm_timebins: [],
            submoas_alarm_severities: [],
            defcon_alarm_counts: [],
            defcon_alarm_timebins: [],
            defcon_alarm_severities: [],
            edges_alarm_counts: [],
            edges_alarm_timebins: [],
            edges_alarm_severities: [],
            ping_slash24_alarm_counts: [],
            ping_slash24_alarm_timebins: [],
            ping_slash24_alarm_severities: [],
            bgp_alarm_counts: [],
            bgp_alarm_timebins: [],
            bgp_alarm_severities: [],
            ucsd_nt_alarm_counts: [],
            ucsd_nt_alarm_timebins: [],
            ucsd_nt_alarm_severities: [],
        },
        {
            asn_name: 'CONNETRO-AS CONNET - RO SRL',
            asn: '34469',
            country_iso_code2: 'RO',
            country_iso_code3: 'ROU',
            country_name: 'Romania',
            hegemony_alarm_counts: [1, 1],
            hegemony_alarm_timebins: ['2023-08-10T00:00:00Z', '2023-08-10T15:00:00Z'],
            hegemony_alarm_severities: ['high', 'high'],
            network_delay_alarm_counts: [],
            network_delay_alarm_timebins: [],
            network_delay_alarm_severities: [],
            moas_alarm_counts: [],
            moas_alarm_timebins: [],
            moas_alarm_severities: [],
            submoas_alarm_counts: [],
            submoas_alarm_timebins: [],
            submoas_alarm_severities: [],
            defcon_alarm_counts: [],
            defcon_alarm_timebins: [],
            defcon_alarm_severities: [],
            edges_alarm_counts: [],
            edges_alarm_timebins: [],
            edges_alarm_severities: [],
            ping_slash24_alarm_counts: [],
            ping_slash24_alarm_timebins: [],
            ping_slash24_alarm_severities: [],
            bgp_alarm_counts: [],
            bgp_alarm_timebins: [],
            bgp_alarm_severities: [],
            ucsd_nt_alarm_counts: [],
            ucsd_nt_alarm_timebins: [],
            ucsd_nt_alarm_severities: []
        },
        {
            asn_name: 'YOUTUBE',
            asn: '36040',
            country_iso_code2: 'US',
            country_iso_code3: 'USA',
            country_name: 'United States',
            ping_slash24_alarm_counts: [],
            ping_slash24_alarm_timebins: [],
            ping_slash24_alarm_severities: [],
            bgp_alarm_counts: [1],
            bgp_alarm_timebins: ['2023-08-10T00:00:00Z'],
            bgp_alarm_severities: ['high'],
            ucsd_nt_alarm_counts: [],
            ucsd_nt_alarm_timebins: [],
            ucsd_nt_alarm_severities: [],
            hegemony_alarm_counts: [],
            network_delay_alarm_counts: [],
            moas_alarm_counts: [],
            submoas_alarm_counts: [],
            defcon_alarm_counts: [],
            edges_alarm_counts: [],
            hegemony_alarm_timebins: [],
            network_delay_alarm_timebins: [],
            moas_alarm_timebins: [],
            submoas_alarm_timebins: [],
            defcon_alarm_timebins: [],
            edges_alarm_timebins: [],
            hegemony_alarm_severities: [],
            network_delay_alarm_severities: [],
            moas_alarm_severities: [],
            submoas_alarm_severities: [],
            defcon_alarm_severities: [],
            edges_alarm_severities: []
        }
    ]


describe('etlTreeMapAggregatedAlarmsDataModel', () => {

    it('should correctly ETL TreeMapAggregatedAlarmsDataModel when all data sources selected', () => {

        const aggregatedAttrsZipped = [
            [
                "hegemony_alarm_counts",
                "hegemony_alarm_timebins",
                "hegemony_alarm_severities"
            ],
            [
                "network_delay_alarm_counts",
                "network_delay_alarm_timebins",
                "network_delay_alarm_severities"
            ]
        ]
        const countryName = null

        const result = TreeMapAggregatedAlarmsDataModel.etl(ALARMS, aggregatedAttrsZipped, countryName)

        const expectedResult = {
            type: 'treemap',
            ids: [
                'Russia',
                'Romania',
                'Russia-Hegemony',
                'Russia-Network Delay',
                'Romania-Hegemony',
                'Romania-Network Delay',
                'Russia-Hegemony-High',
                'Russia-Network Delay-High',
                'Romania-Hegemony-High'
            ],
            labels: [
                'Russia',
                'Romania',
                'Hegemony',
                'Network Delay',
                'Hegemony',
                'Network Delay',
                'High',
                'High',
                'High'
            ],
            parents: [
                '',
                '',
                'Russia',
                'Russia',
                'Romania',
                'Romania',
                'Russia-Hegemony',
                'Russia-Network Delay',
                'Romania-Hegemony'
            ],
            values: [
                0, 0, 0, 0, 0,
                0, 1, 1, 2
            ],
            text: [
                'Country Name: Russia<br>Total Alarm Counts: 2',
                'Country Name: Romania<br>Total Alarm Counts: 2',
                'Hegemony Alarm Counts: 1',
                'Network Delay Alarm Counts: 1',
                'Hegemony Alarm Counts: 2',
                'Network Delay Alarm Counts: 0',
                '',
                '',
                ''
            ],
            hoverinfo: 'label+text+value'
        }

        expect(result).toEqual(expectedResult)
    });

    it('should handle empty alarms array', () => {
        const alarms = [];
        const aggregatedAttrsZipped = [
            ["hegemony_alarm_counts", "hegemony_alarm_timebins", "hegemony_alarm_severities"],
            ["network_delay_alarm_counts", "network_delay_alarm_timebins", "network_delay_alarm_severities"]
        ];
        const countryName = null;

        const result = TreeMapAggregatedAlarmsDataModel.etl(alarms, aggregatedAttrsZipped, countryName);

        expect(result).toEqual({});
    });

    it('should handle empty aggregatedAttrsZipped array', () => {
        const aggregatedAttrsZipped = [];
        const countryName = null;

        const result = TreeMapAggregatedAlarmsDataModel.etl(ALARMS, aggregatedAttrsZipped, countryName);

        expect(result).toEqual({});
    });

    it('should handle non-nullable countryName', () => {
        const countryName = 'Romania'
        const aggregatedAttrsZipped = [
            ["hegemony_alarm_counts", "hegemony_alarm_timebins", "hegemony_alarm_severities"]
        ];

        const result = TreeMapAggregatedAlarmsDataModel.etl(ALARMS, aggregatedAttrsZipped, countryName);

        const expectedResult = {
            type: 'treemap',
            ids: [
                'CONNETRO-AS CONNET - RO SRL',
                'CONNETRO-AS CONNET - RO SRL-Hegemony',
                'CONNETRO-AS CONNET - RO SRL-Hegemony-High'
            ],
            labels: ['CONNETRO-AS CON...', 'Hegemony', 'High'],
            parents: [
                '',
                'CONNETRO-AS CONNET - RO SRL',
                'CONNETRO-AS CONNET - RO SRL-Hegemony'
            ],
            values: [0, 0, 2],
            text: [
                'Asn Name: CONNETRO-AS CONNET - RO SRL<br>Total Alarm Counts: 2',
                'Hegemony Alarm Counts: 2',
                ''
            ],
            hoverinfo: 'label+text+value'
        }
        
        expect(result).toEqual(expectedResult)
    });

    it("should handle non-existing country", () => {
        const countryName = 'Non-existing Country'
        const aggregatedAttrsZipped = [
            ["hegemony_alarm_counts", "hegemony_alarm_timebins", "hegemony_alarm_severities"]
        ];

        const result = TreeMapAggregatedAlarmsDataModel.etl(ALARMS, aggregatedAttrsZipped, countryName);
        expect(result).toEqual({})
    })

})