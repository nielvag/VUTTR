const Yup = require('yup');

const Tool = require('../models/Tool');
const User = require('../models/User');
const Tag = require('../models/Tag');
const ToolTag = require('../models/ToolTag');

const validationErrorMessage = 'It seems there is an error in the request!';

module.exports = {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      link: Yup.string().url(),
      description: Yup.string(),
      tags: Yup.array(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: validationErrorMessage });
    }

    const { title, link, description, tags } = req.body;

    const tool = await Tool.create({
      title,
      link,
      description,
      own_id: req.userId
    });

    const promisesToCreateTags = tags.map((tag) => Tag.findOrCreate({
      where: {
        name: String(tag),
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

    return res.status(201).json({
      id: tool.id,
      title: tool.title,
      link: tool.link,
      description: tool.description,
      tags: tagsName,
    });
  },

  async index(req, res) {
    const schema = Yup.object().shape({
      per_page: Yup.number().positive().min(1),
      page: Yup.number().positive().min(1),
      tag: Yup.string(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: validationErrorMessage });
    }

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

    return res.json(toolsFormatted);
  },

  async remove(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().positive().min(1),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: validationErrorMessage });
    }

    const { id: tool_id } = req.params;

    const tool = await Tool.findOne({ where: { id: tool_id } });

    if(req.userId != tool.own_id) {
      return res.status(401).json({ error: 'Not permitted' })
    }

    await ToolTag.destroy({
      where: {
        tool_id,
      },
    });

    await Tool.destroy({
      where: {
        id: tool_id,
      },
    });

    return res.status(204).json();
  },
};
