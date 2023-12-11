const express = require("express");
const Subject= require("../Model/Subjects")
const router =  express.Router()




// POST method for adding codingbasic
//http://localhost:4010/v4/addbasic/6571ad89cf0acc567c548296/6571ae96cf0acc567c54829c
router.post('/addbasic/:subjectId/:chapterId', async (req, res) => {
    try {
      const subjectId = req.params.subjectId;
      const chapterId = req.params.chapterId;
      const {
        Subjects,
        Chapters,
        Title,
        Programminglanguage,
        Description,
        Constraints,
      } = req.body;
  
      // Find the subject by ID
      const existingSubject = await Subject.findById(subjectId);
  
      if (!existingSubject) {
        return res.status(404).json({ msg: 'Subject not found', status: 'failed' });
      }
  
      // Find the specific chapter within the subject
      const chapter = existingSubject.chapter.id(chapterId);
  
      if (!chapter) {
        return res.status(404).json({ msg: 'Chapter not found', status: 'failed' });
      }
  
      // Create a new codingbasic entry
      const newCodingBasic = {
        Subjects,
        Chapters,
        Title,
        Programminglanguage,
        Description,
        Constraints,
      };
  
      // Add the new codingbasic entry to the "codingbasic" array in the chapter
      chapter.codingbasic.push(newCodingBasic);
  
      // Save the updated subject document
      await existingSubject.save();
  
      return res.json({ msg: 'Coding Basic added successfully', status: 'success' });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: 'Internal Server Error', status: 'failed' });
    }
  });

// PUT method for updating codingbasic
router.put('/:subjectId/chapters/:chapterId/codingbasic/:codingbasicId', async (req, res) => {
    try {
      const subjectId = req.params.subjectId;
      const chapterId = req.params.chapterId;
      const codingbasicId = req.params.codingbasicId;
      const {
        Subjects,
        Chapters,
        Title,
        Programminglanguage,
        Description,
        Constraints,
      } = req.body;
  
      // Find the subject by ID
      const existingSubject = await Subject.findById(subjectId);
  
      if (!existingSubject) {
        return res.status(404).json({ msg: 'Subject not found', status: 'failed' });
      }
  
      // Find the specific chapter within the subject
      const chapter = existingSubject.chapter.id(chapterId);
  
      if (!chapter) {
        return res.status(404).json({ msg: 'Chapter not found', status: 'failed' });
      }
  
      // Find the codingbasic entry within the chapter
      const codingbasicEntry = chapter.codingbasic.id(codingbasicId);
  
      if (!codingbasicEntry) {
        return res.status(404).json({ msg: 'Coding Basic entry not found', status: 'failed' });
      }
  
      // Update the codingbasic entry properties
      codingbasicEntry.Subjects = Subjects;
      codingbasicEntry.Chapters = Chapters;
      codingbasicEntry.Title = Title;
      codingbasicEntry.Programminglanguage = Programminglanguage;
      codingbasicEntry.Description = Description;
      codingbasicEntry.Constraints = Constraints;
  
      // Save the updated subject document
      await existingSubject.save();
  
      return res.json({ msg: 'Coding Basic updated successfully', status: 'success' });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: 'Internal Server Error', status: 'failed' });
    }
  });
  













module.exports = router;