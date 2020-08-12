const Op = require('sequelize');
const Tool = require('../models/Tool');
const Tag = require('../models/Tag');
const ToolTag = require('../models/ToolTag');

module.exports = {
  async store(req, res) {
    const { title, link, description, tags } = req.body;

    const tool = await Tool.create({ title, link, description });

    const promisesToCreateTags = tags.map((tag) => Tag.findOrCreate({
      where: {
        name: tag,
      },
    }));

    const tagsName = [];

    const promisesToCreateAssociation = (
      await Promise.all(promisesToCreateTags)
    ).map(([tag]) => {
      tagsName.push(tag.name);

      return ToolTag.create({
        tool_id: tool.id,
        tag_id: tag.id,
      });
    });

    await Promise.all(promisesToCreateAssociation);

    res.json({
      title: tool.title,
      link: tool.link,
      description: tool.description,
      tags: tagsName,
    });
  },

  async index(req, res) {
    const { per_page = 30, page = 1, tag } = req.query;

    const filterOption = tag ? { name: tag } : {};

    const tools = await Tool.findAll({
      attributes: ['id', 'title', 'link', 'description'],
      include: {
        model: Tag,
        attributes: ['name'],
        where: filterOption,
      },
      limit: per_page,
      offset: (page - 1) * per_page,
    });

    let toolsWithTags;

    if (tag) {
      const toolsWithTagsPromises = tools.map((tool) => (
        Tool.findOne({
          where: {
            id: tool.id,
          },
          include: {
            model: Tag,
            attributes: ['name'],
          },
        })
      ));

      toolsWithTags = await Promise.all(toolsWithTagsPromises);
    } else {
      toolsWithTags = tools;
    }

    const toolsFormatted = toolsWithTags.map(({ id, title, link, description, Tags }) => ({
      id,
      title,
      link,
      description,
      tags: Tags.map(({ name }) => name),
    }));

    res.json(toolsFormatted);
  },
};
