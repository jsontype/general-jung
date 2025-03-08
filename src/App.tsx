import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import MovieList from './components/Organisms/MovieList'
import NewsList from './components/Organisms/NewsList'
import Counter from './components/Organisms/Counter'
import TodoLists from './components/Organisms/TodoLists'
import Home from './components/Home'
import './i18n'
import ButtonLang from './components/Atoms/ButtonLang'
import MovieIcon from '@mui/icons-material/Movie'
import CalculateIcon from '@mui/icons-material/Calculate'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import ChecklistIcon from '@mui/icons-material/Checklist'
import HomeIcon from '@mui/icons-material/Home'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

export default function AnchorTemporaryDrawer() {
  const [movies] = useState([])
  const [news] = useState([])
  const [count] = useState(0)
  const [todos] = useState([])
  const { i18n, t } = useTranslation()
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
    }

  const onChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List onKeyDown={toggleDrawer(anchor, false)}>
        {[
          t('home:title'),
          t('counter:title'),
          t('movies:title'),
          t('news:title'),
          t('todos:title'),
        ].map(text => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={getLink(text)}>
              <ListItemIcon>
                {text === t('home:title') ? (
                  <HomeIcon />
                ) : text === t('counter:title') ? (
                  <CalculateIcon />
                ) : text === t('movies:title') ? (
                  <MovieIcon />
                ) : text === t('news:title') ? (
                  <NewspaperIcon />
                ) : (
                  <ChecklistIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <div className="flex justify-around items-center p-4">
        {/* 각 언어 버튼 */}
        <ButtonLang onChangeLanguage={onChangeLanguage} onChangeLngArgs={'ko'} />
        <ButtonLang onChangeLanguage={onChangeLanguage} onChangeLngArgs={'en'} />
        <ButtonLang onChangeLanguage={onChangeLanguage} onChangeLngArgs={'ja'} />
      </div>
    </Box>
  )
  // Link function
  const getLink = (text: string) => {
    switch (text) {
      case t('counter:title'):
        return '/counter'
      case t('movies:title'):
        return '/movies'
      case t('news:title'):
        return '/news'
      case t('todos:title'):
        return '/todo'
      default:
        return '/'
    }
  }
  return (
    <>
      <div className="bg-stone-300">
        {/*Header*/}
        {(['left'] as const).map(anchor => (
          <React.Fragment key={anchor}>
            {/** Left Menu : Logo, Menu Button */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <span
                  className="font-bold text-lg pt-2
              
                px mx-1 px-1"
                >
                  {' '}
                  General App
                </span>
                <Button
                  variant="contained"
                  onClick={toggleDrawer(anchor, true)}
                  sx={{ color: 'white' }}
                >
                  {t('common:navigation')}
                </Button>
              </div>

              {/** Right Menu : Lang Change */}
              <Box sx={{ display: 'flex', gap: '0.2rem' }}>
                <ButtonLang onChangeLanguage={onChangeLanguage} onChangeLngArgs={'ko'} />
                <ButtonLang onChangeLanguage={onChangeLanguage} onChangeLngArgs={'en'} />
                <ButtonLang onChangeLanguage={onChangeLanguage} onChangeLngArgs={'ja'} />
              </Box>
            </div>

            {/** Right Menu : Lang Change */}
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList initialMovies={movies} />} />
          <Route path="/news" element={<NewsList initialNews={news} />} />
          <Route path="/counter" element={<Counter initialCount={count} />} />
          <Route path="/todo" element={<TodoLists initialTodos={todos} />} />
        </Routes>
      </div>
    </>
  )
}
