import express from 'express';
import { getReportsSummary } from './getReportsSummary.js';
import { generateGraduatesSummaryReport } from './generateGraduatesSummaryReport.js';
import { generateGraduatesByYearReport } from './generateGraduatesByYearReport.js';
import { generateGraduatesBySpecializationReport } from './generateGraduatesBySpecializationReport.js';
import { generateClassificationsReport } from './generateClassificationsReport.js';

const reportsRoute = express.Router();

// GET /api/role/administrator/graduate/reports/summary
reportsRoute.get('/summary', getReportsSummary);

// POST /api/role/administrator/graduate/reports/graduates-summary
reportsRoute.post('/graduates-summary', generateGraduatesSummaryReport);

// POST /api/role/administrator/graduate/reports/graduates-by-year
reportsRoute.post('/graduates-by-year', generateGraduatesByYearReport);

// POST /api/role/administrator/graduate/reports/graduates-by-specialization
reportsRoute.post('/graduates-by-specialization', generateGraduatesBySpecializationReport);

// POST /api/role/administrator/graduate/reports/classifications-report
reportsRoute.post('/classifications-report', generateClassificationsReport);

export default reportsRoute;
