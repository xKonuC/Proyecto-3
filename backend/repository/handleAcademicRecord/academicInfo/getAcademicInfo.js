import pool from '../../../dbConnection.js';

class GetAcademicInfo {
  async getAcademicInfo(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      SELECT
        CONCAT_WS(' ', a.firstName, a.secondName, a.surname1, a.surname2) AS fullName,
        ai.userID,
        ai.bondType,
        ai.investigationLines,
        ai.bestDegreeID,
        ai.workedHours,
        ai.hierarchy,
        bestDegree.academicHasTitleID AS bestDegreeID,
        bestDegree.titleYear AS bestDegreeTitleYear,
        bestDegree.archiveURL AS bestDegreeArchiveURL,
        bestDegree.studyField AS bestDegreeStudyField,
        (SELECT JSON_OBJECT('name', format.name) FROM format WHERE format.formatID = bestDegree.formatID) AS bestDegreeFormat,
        (SELECT JSON_OBJECT(
            'titleID', titleHasUniversity.titleID,
            'universityID', titleHasUniversity.universityID,
            'universityName', titleHasUniversity.universityName,
            'degreeID', titleHasUniversity.degreeID,
            'name', titleHasUniversity.name,
            'country', titleHasUniversity.country,
            'city', titleHasUniversity.city,
            'degree', titleHasUniversity.degree,
            'type', titleHasUniversity.type,
            'area', (SELECT name FROM area WHERE area.areaID = titleHasUniversity.areaID)
        ) FROM titleHasUniversity 
        WHERE titleHasUniversity.titleID = bestDegree.titleID) AS bestDegreeTitle,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'academicHasTitleID', aht.academicHasTitleID,
            'titleYear', aht.titleYear,
            'archiveURL', aht.archiveURL,
            'studyField', aht.studyField,
            'format', (SELECT JSON_OBJECT('name', format.name) FROM format WHERE format.formatID = aht.formatID),
            'title', (SELECT JSON_OBJECT(
                'titleID', titleHasUniversity.titleID,
                'universityID', titleHasUniversity.universityID,
                'universityName', titleHasUniversity.universityName,
                'degreeID', titleHasUniversity.degreeID,
                'name', titleHasUniversity.name,
                'country', titleHasUniversity.country,
                'city', titleHasUniversity.city,
                'degree', titleHasUniversity.degree,
                'type', titleHasUniversity.type,
                'area', (SELECT name FROM area WHERE area.areaID = titleHasUniversity.areaID)
            ) FROM titleHasUniversity WHERE titleHasUniversity.titleID = aht.titleID)
          )
        ) AS otherTitles
      FROM academicInfo ai
      LEFT JOIN academicHasTitle bestDegree ON ai.bestDegreeID = bestDegree.academicHasTitleID
      LEFT JOIN academic a ON ai.userID = a.userID
      LEFT JOIN academicHasTitle aht ON ai.userID = aht.userID
      WHERE ai.userID = ?
      GROUP BY ai.userID, bestDegree.academicHasTitleID;
    `, [userID]);
    connection.release();
    return result;
  }
}

export { GetAcademicInfo };
