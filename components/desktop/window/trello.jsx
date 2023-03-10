import styles from 'styles/components/desktop/window/trello.module.scss'
import { CreateLink, NotFound } from 'components/marquee'
import SettingsIcon from 'icons/settings'
import Label from 'components/page/label'
import Window from 'components/desktop/window'
import { Fragment } from 'react'

function Projects(project, index) {
  if (index >= 2) return
  const { name, more, labels } = project

  const createProps = {
    className: styles.card,
    href: more ? more.url : null,
  }
  const notProps = {
    className: styles.card,
    href: '/404',
  }

  function LinkContent() {
    return (
      <Fragment>
        <div className={styles.name}>{name}</div>
        <div className={styles.label_wrap}>
          {labels.map(({ name, color }, index) => (
            <Label key={'label' + index} color={color}>
              {name}
            </Label>
          ))}
        </div>
      </Fragment>
    )
  }

  function IsLink() {
    return (
      <CreateLink {...createProps}>
        <LinkContent />
      </CreateLink>
    )
  }

  function IsNotLink() {
    return (
      <NotFound {...notProps}>
        <LinkContent />
      </NotFound>
    )
  }

  return (
    <div key={'project' + index} className={styles.row}>
      {more ? <IsLink /> : <IsNotLink />}
    </div>
  )
}

function TrelloWindow({ name, folders, projects, style }) {
  const windowProps = {
    name,
    folders,
    style,
  }

  return (
    <Window {...windowProps}>
      <div className={styles.window}>
        <header className={styles.header}>
          <div>Projects</div>
          <div>
            <SettingsIcon />
          </div>
        </header>
        <main>{projects.map(Projects)}</main>
        <footer className={styles.footer}>
          <div>+ See more</div>
          <div>icon</div>
        </footer>
      </div>
    </Window>
  )
}

export default TrelloWindow
